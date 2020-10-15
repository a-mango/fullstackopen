import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const { title, author, url, likes } = blog
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #242424',
    padding: '0.2em',
    marginBottom: '0.4em',
  }

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{title}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{author}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>
                  <a href={url}>{url}</a>
                </td>
              </tr>
              <tr>
                <td>Likes</td>
                <td>{likes}</td>
              </tr>
            </tbody>
          </table>
          <button>Like</button>
        </div>
      ) : (
        <div>
          <p>
            {title} - {author}
          </p>
        </div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
    </div>
  )
}

export default Blog
