import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

var blog
var component

var mockHandler = jest.fn()

beforeEach(() => {
  blog = {
    title: 'Test Blog Title',
    author: 'Author Testblog',
    url: 'www.blogurl.fi',
    likes: 10
  }
  mockHandler = jest.fn()

})

test('renders blog title and author on default. Url and likes are hidden on default', () => {

  component = render(
    <Blog blog={blog} />
  )

  const description = component.container.querySelector('.blog-listing')
  const info = component.container.querySelector('.blog-info')

  expect(component.container).toHaveTextContent(
    'Test Blog Title'
  )
  expect(component.container).toHaveTextContent(
    'Author Testblog'
  )
  expect(description).not.toHaveStyle('display: none')
  expect(info).toHaveStyle('display: none')
})

test('url and likes are shown, once "show" button is clicked', () => {

  component = render(
    <Blog blog={blog} likeButtonHandler={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const info = component.container.querySelector('.blog-info')

  expect(info).not.toHaveStyle('display: none')
})

test('if "like" button is clicked twice, eventhandler is called twice', () => {

  component = render(
    <Blog blog={blog} likeButtonClickHandler={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})