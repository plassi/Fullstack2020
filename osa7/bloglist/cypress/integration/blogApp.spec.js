describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Test User',
      username: 'test-user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('test-user')
      cy.get('input[name="Password"]').type('password')
      cy.get('button').contains('login').click()

      cy.get('.message').should('contain', 'logged in as test-user')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('wrong')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('button').contains('login').click()

      cy.get('.message').should('contain', 'wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
      cy.login({
        username: 'test-user',
        password: 'password'
      })
    })

    it('A blog can be created', function () {
      cy.get('#create-blog-button').click()
      cy.get('input#title').type('Testiblogin title')
      cy.get('input#author').type('Testiblogin author')
      cy.get('input#url').type('www.testiblogi.fi')

      cy.get('#create-submit-button').click()

      cy.get('.blog-listing').contains('Testiblogin title Testiblogin author')
    })

    describe('Database contains blogs created by test user', function () {
      beforeEach(function () {

        const blogs = [
          {
            title: 'testBlog1 title',
            author: 'testBlog1 author',
            url: 'www.testBlog1.fi',
            likes: 0
          },
          {
            title: 'testBlog2 title',
            author: 'testBlog2 author',
            url: 'www.testBlog2.fi',
            likes: 2
          },
          {
            title: 'testBlog3 title',
            author: 'testBlog3 author',
            url: 'www.testBlog3.fi',
            likes: 1
          },
          {
            title: 'testBlog4 title',
            author: 'testBlog4 author',
            url: 'www.testBlog4.fi',
            likes: 5
          },
          {
            title: 'testBlog5 title',
            author: 'testBlog5 author',
            url: 'www.testBlog5.fi',
            likes: 4
          },
        ]
        blogs.forEach(blog =>
          cy.request({
            url: 'http://localhost:3001/api/blogs',
            method: 'POST',
            body: blog,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
            }
          })
        )
        cy.visit('http://localhost:3000')

      })

      it('User can like a blog', function () {

        cy.get('#show-blog-button').click()
        cy.get('.blog-listing').contains('likes 5')
        cy.get('#like-blog-button').click()
        cy.get('.blog-listing').contains('likes 6')
      })

      it('User can remove added blog by user', function () {

        cy.get('#show-blog-button').click()
        cy.get('#remove-blog-button').click()

        cy.get('html').should('not.contain', 'testBlog4')
      })

      it.only('Blog listing is sorted by number of likes', function () {
        cy.get('button#show-blog-button').each((button) => {
          button.click()
        })
        cy.get('.blog-listing:nth(0)').contains('likes 5')
        cy.get('.blog-listing:nth(1)').contains('likes 4')
        cy.get('.blog-listing:nth(2)').contains('likes 2')
        cy.get('.blog-listing:nth(3)').contains('likes 1')
        cy.get('.blog-listing:nth(4)').contains('likes 0')

      })
    })
  })

})