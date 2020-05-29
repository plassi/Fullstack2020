const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/add-blogs', async (request, response) => {
  console.log('add-blogs router');
  
  await Blog.create(request.body)

  response.status(200).end()
})

module.exports = router