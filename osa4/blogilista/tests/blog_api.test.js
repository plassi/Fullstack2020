const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await api.post('/api/users')
    .send(helper.initialUser)

  const users = await helper.usersInDb()
  const userId = users[0].id
  
  helper.initialBlogs.map(async blog => {
    //Lisää blogi kerrallaan post käskyllä lisäten käyttäjä.
    
    const newBlog = {
      ...blog,
      user: userId
    }
    
    const savedBlog = await Blog.create(newBlog)
    
    
  })
  const user = await User.findById(userId)

  const blogsAtStart = await helper.blogsInDb()
  
  blogsAtStart.map(blog => {
    user.blogs = user.blogs.concat(blog.id)

  })
  
  await user.save()

  // Get a token for user
  const loginInfo = {
    username: helper.initialUser.username,
    password: helper.initialUser.password
  }
  const response = await api
    .post('/api/login')
    .send(loginInfo)
  token = ('bearer ' + response.body.token)

})

describe('GET blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blog', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'React patterns'
    )
  })

  test('blog id field name is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST blog', () => {
  
  test('a valid blog can be added ', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'http://testi.com/testi.html',
      likes: 5,
      userId: users[0].id
    }
    
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'TestTitle'
    )
  })

  test('if posted blog is not given likes, likes is 0 ', async () => {
    const users = await helper.usersInDb()
    const newBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'http://testi.com/testi.html',
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(blog.likes).toBe(0)
  })

  test('posted blog has to have title and url', async () => {
    const users = await helper.usersInDb()
    
    const newBlog = {
      author: 'TestAuthor',
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('posted blog has userId and user has array of posted blogs', async () => {
    const users =  await helper.usersInDb()

    const newBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'http://testi.com/testi.html',
      userId: users[0].id
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const usersAtEnd = await helper.usersInDb()

    const res = await api.get('/api/blogs')
    
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1 )
    expect(res.body[0].user.name).toEqual(usersAtEnd[0].name)
  })

  test('if token is not posted, returns 401 Unauthorized', async () => {
    const users =  await helper.usersInDb()

    const newBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'http://testi.com/testi.html',
      userId: users[0].id
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const urls = blogsAtEnd.map(r => r.url)

    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('UPDATE blog', () => {

  test('saves and returns updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 9999

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).toContain(blogToUpdate.likes)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})