Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

describe('Bloglist app', function () {
  beforeEach(function () {
    // Reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create 2 users for testing
    const user1 = {
      username: 'root',
      name: 'Superuser',
      password: '1234',
    }

    const user2 = {
      ...user1,
      username: 'eviluser',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#login-username').type('root')
      cy.get('input#login-password').type('1234')
      cy.get('button#login-submit').click()

      cy.contains('Logged in as root')
    })

    it('fails with invalid credentials', function () {
      cy.get('input#login-username').type('root')
      cy.get('input#login-password').type('4321')
      cy.get('button#login-submit').click()

      cy.contains('Authentication failed')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '1234' })
    })

    it('A blog can be created', function () {
      cy.contains('Add blog').click()
      cy.get('input#blog-title').type('The Tennessee Stud')
      cy.get('input#blog-author').type('Johnny Cash')
      cy.get('input#blog-url').type('http://example.com')
      cy.get('button#blog-submit').click()

      cy.get('.Notification').contains(
        'Success: A new blog was added to the database'
      )
      cy.get('.Blog').contains('The Tennessee Stud - Johnny Cash')
      cy.get('.BlogList').find('.Blog').should('have.length', 1)
    })

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing Cypress',
          author: 'Mr Test',
          url: 'http://example.com',
        })
      })

      it('It can be liked', function () {
        cy.contains('Testing Cypress')
          .parents()
          .find('.Blog')
          .as('blogContainer')

        cy.get('@blogContainer').get('button').contains('View').click()
        cy.get('@blogContainer').get('button').contains('Like').click()
      })

      it('It can be deleted by the owner', function () {
        cy.contains('Testing Cypress')
          .parents()
          .find('.Blog')
          .as('blogContainer')

        cy.get('@blogContainer').get('button').contains('View').click()
        cy.get('@blogContainer').get('button').contains('Delete').click()
      })

      it('It cannot be deleted by another user', function () {
        cy.login({ username: 'eviluser', password: '1234' })

        cy.contains('Testing Cypress')
          .parents()
          .find('.Blog')
          .as('blogContainer')

        cy.get('@blogContainer').get('button').contains('View').click()
        cy.get('@blogContainer')
          .get('button')
          .contains('Delete')
          .should('not.exist')
      })
    })

    describe('And multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing Blog 1',
          author: 'Mr Test',
          url: 'http://example.com',
          likes: 2,
        })
        cy.createBlog({
          title: 'Testing Blog 2',
          author: 'Mr Test',
          url: 'http://example.com',
          likes: 5,
        })
        cy.createBlog({
          title: 'Testing Blog 3',
          author: 'Mr Test',
          url: 'http://example.com',
          likes: 8,
        })
      })

      it('They are ordered by the amount of likes', function () {
        cy.get('.Blog').should(items => {
          expect(items[0]).to.contain.text('Testing Blog 3')
          expect(items[1]).to.contain.text('Testing Blog 2')
          expect(items[2]).to.contain.text('Testing Blog 1')
        })
      })
    })
  })
})
