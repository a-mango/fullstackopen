import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from 'Components/Blog'

const mockUser = {
  username: 'mock',
}

const mockBlog = {
  title: 'Lifting State Up',
  author: 'React Dev Team',
  url: 'https://reactjs.org/docs/lifting-state-up.html',
  likes: '5',
  user: mockUser,
}

describe('<Blog />', () => {
  let component, updateBlog, removeBlog, blogElement

  beforeEach(() => {
    updateBlog = jest.fn()
    removeBlog = jest.fn()
    component = render(
      <Blog
        blog={mockBlog}
        user={mockUser}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
      />
    )
    blogElement = component.container.querySelector('.Blog')
  })

  test('at start only summary information is displayed', () => {
    const summaryElement = component.container.querySelector('.BlogSummary')

    expect(summaryElement).toBeVisible()
  })

  test('after clicking the \'View\' button details are displayed', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const detailElement = component.container.querySelector('.BlogDetail')

    expect(detailElement).toBeVisible()
  })

  test('when like button is clicked twice event handler is called the right amount of times', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
