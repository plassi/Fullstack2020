const bcrypt = require('bcrypt')
const User = require('../models/user')

const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newUser',
      name: 'New User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('get all users', async () => {
    const usersAtStart = await helper.usersInDb()
    const users = await api.get('/api/users')
    expect(users.body).toEqual(usersAtStart)
  })

})

test('400 error and not added user with password with 2 characters', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: "invalidUser",
    password: "12"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()

  expect(usersAtStart.length).toEqual(usersAtEnd.length)
})

test('400 error and not added user with no password', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: "invalidUser2"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()

  expect(usersAtStart.length).toEqual(usersAtEnd.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})