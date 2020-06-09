import React from 'react'

const Users = (props) => {

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr key={user.id}>
              <td><a href={`/users/${user.id}`}>{user.name}</a></td>
              <td>{user.blogs.length}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users