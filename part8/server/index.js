require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub,
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const pubsub = new PubSub()

const { MONGODB_URI, JWT_SECRET } = process.env

console.log('⏳ Connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch(error => {
    console.log('❌ Error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books
      const author = await Author.findOne({ name: args.author })

      if (args.author && args.genre) {
        // Find books by author and genre
        console.log("Looking for books by author and genre", args.author, args.genre)
        books = Book.find({
          author: author._id,
          genres: { $in: args.genre },
        }).populate('author')
      } else if (args.author && !args.genre) {
        // Find books by author
        console.log("Looking for books by author", args.author)
        books = Book.find({
          author: author._id,
        }).populate('author')
      } else if (args.genre && !args.author) {
        // Find books by genre
        console.log("Looking for books by genre", args.genre)
        books = Book.find({
          genres: { $in: args.genre },
        }).populate('author')
      } else {
        // Find all books
        console.log("Looking for all books")
        books = Book.find({}).populate('author')
      }

      return books
    },
    allAuthors: (root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async root => {
      const author = await Author.findOne({ name: root.name })
      return Book.countDocuments({ author: author._id })
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'User must be authenticated to add a book'
        )
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args })
      try {
        await author.save()
        book.author = author
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'User must be authenticated to edit an author'
        )
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new UserInputError('Author must exist', {
          invalidArgs: args,
        })
      }

      author.born = args.setBornTo

      try {
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'magic') {
        throw new UserInputError('Password or username is incorrect')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']) },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`📡 Subscriptions ready at ${subscriptionsUrl}`)
})
