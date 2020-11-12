import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  )

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`Voted for anecdote "${anecdote.content}"`, 10))
  }

  return (
    <div>
      {anecdotes &&
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => vote(anecdote)}
            />
          ))}
    </div>
  )
}

export default AnecdoteList
