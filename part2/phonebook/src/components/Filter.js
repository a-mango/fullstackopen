import React from 'react'

const Filter = ({filter, setFilter, handleFilterChange}) => {
  return (
    <div>
      <h2>Filter</h2>
      <form onSubmit={setFilter}>
        <div>
          filter: <input value={filter} onChange={handleFilterChange} />
        </div>
      </form> 
    </div>
  )
}

export default Filter
