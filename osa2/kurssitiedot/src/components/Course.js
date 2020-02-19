import React from 'react'

const Courses = ({courses}) => {

  return (
    <div>
    {courses.map((course) => 
    
      <Course key={course.id} course={course} />
    )}
    </div>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h2>{props.course.name}</h2>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(element =>

        <Part key={element.id} name={element.name} exercises={element.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = ({ course }) => {

  const total = course.parts.map((part) => part.exercises).reduce((s, p) => s + p)

  return (
    <div>
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}


export default Courses