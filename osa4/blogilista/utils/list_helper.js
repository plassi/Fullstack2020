const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const mostLikes = Math.max.apply(Math, blogs.map(function (o) { return o.likes; }))
  const blog = blogs.filter(blog => blog.likes === mostLikes)[0]

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  const numOfBlogs = _.countBy(blogs, 'author')

  const sorted = _.fromPairs(_.sortBy(_.toPairs(numOfBlogs), 1).reverse())

  return {
    author: Object.keys(sorted)[0],
    blogs: Object.values(sorted)[0]
  }
}

const mostLikes = blogs => {
  const reducer = (sum, item) => {

    if (_.includes(sum.map(e => e.author), item.author)) {
      sum.map(e => {
        e.author === item.author 
        ? e.likes = e.likes + item.likes
        : null
      })

      return sum
    }
    else {
      return (_.concat(sum, { author: item.author, likes: item.likes }))
    }

  }

  const reduced = _.reduce(blogs, reducer, [{ author: '', likes: 0 }])

  const sorted = _.sortBy(reduced, 'likes').reverse()

  return sorted[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}