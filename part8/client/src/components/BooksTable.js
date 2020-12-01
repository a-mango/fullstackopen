import React from 'react'

const BooksTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map(book => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
