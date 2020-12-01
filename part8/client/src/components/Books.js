import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../utils/queries'

const Books = props => {
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('')

  const booksByGenre = () =>
    filter === ''
      ? books
      : books.filter(book => book.genres.some(g => g === filter))

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      const allGenres = new Set(allBooks.map(book => book.genres).flat())
      setGenres([...allGenres])
    }
  }, [result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {filter && <p>In genre "{filter}"</p>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre().map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter('')}>All genres</button>
      </div>
    </div>
  )
}

export default Books
