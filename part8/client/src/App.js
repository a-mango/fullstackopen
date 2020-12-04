import React, { useState } from 'react'
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './utils/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(i => i.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`Book "${addedBook.title}" by ${addedBook.author.name} was added`)
      updateCacheWith(addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token === null ? (
          <LoginForm setToken={setToken} />
        ) : (
          <>
            <button onClick={() => setPage('add')}>Add book</button>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <Notification message={message} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
        notify={notify}
      />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
