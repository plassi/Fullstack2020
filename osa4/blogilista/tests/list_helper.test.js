const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const blogs = helper.initialBlogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('favoriteBlog', () => {
  const favorite =
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }
  test('is returned correctly', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favorite)
  })
})

describe('mostBlogs', () => {
  const mostBlogs =
  {
    author: "Robert C. Martin",
    blogs: 3
  }
  test('is returned correctly', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })
})

describe('mostLikes', () => {
  const mostLikes =
  {
    author: "Edsger W. Dijkstra",
    likes: 17
  }
  test('is returned correctly', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikes)
  })
})