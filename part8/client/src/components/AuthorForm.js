import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../utils/queries'
import Select from 'react-select'

const AuthorForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = event => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: +year,
      },
    })

    setSelectedOption(null)
    setYear('')
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
