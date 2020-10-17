import React from 'react'
import { render, fireEvent, getByLabelText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

const mockBlog = {
  title: 'Lifting State Up',
  author: 'React Dev Team',
  url: 'https://reactjs.org/docs/lifting-state-up.html',
  likes: '5',
}

describe('<BlogForm />', () => {
  test('calls event handler with right details', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    const titleInput = component.getByLabelText('Title:')
    const authorInput = component.getByLabelText('Author:')
    const urlInput = component.getByLabelText('Url:')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: mockBlog.title },
    })
    fireEvent.change(authorInput, {
      target: { value: mockBlog.author },
    })
    fireEvent.change(urlInput, {
      target: { value: mockBlog.url },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        title: mockBlog.title,
        author: mockBlog.author,
        url: mockBlog.url,
      })
    )
  })
})
