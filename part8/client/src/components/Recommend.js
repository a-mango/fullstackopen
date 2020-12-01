import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../utils/queries'
import BooksTable from './BooksTable'

const Recommend = props => {
  const [books, setBooks] = useState([])

  const userQuery = useQuery(ME)
  const [getBooks, booksQuery] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userQuery.data) {
      console.log(userQuery.data.me.favoriteGenre)

      getBooks({ variables: { genre: userQuery.data.me.favoriteGenre } })
    }
  }, [getBooks, userQuery])

  useEffect(() => {
    if (booksQuery.data) {
      console.log(booksQuery.data)
      setBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery])

  if (!props.show) {
    return null
  }

  if (userQuery.loading || booksQuery.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {userQuery.data.me.favoriteGenre}</p>
      <BooksTable books={books} />
    </div>
  )
}

export default Recommend
