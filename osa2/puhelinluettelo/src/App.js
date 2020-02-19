import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const FilterField = (props) => {

  return (
    <div>
      filter shown with
      <input
        onChange={props.handler}
      />
    </div>
  )
}

const Persons = ({ persons, filter, deletePerson, setPersons, setNewName }) => {
  return (

    <div>
      {persons.map((person) => {

        const nameLowerCase = person.name.toLowerCase()

        if (nameLowerCase.includes(filter.slice(1, -1)) || filter.length === 3) {

          return (
            <div key={person.name}>
              {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>
                delete
              </button>
            </div>
          )
        } else {
          return (
            <div key={person.name}></div>
          )
        }
      })}
    </div>

  )
}

const PersonForm = (props) => {

  return (
    <form>
      <div>
        name:
          <input
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:
          <input
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit" onClick={props.addPerson}>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setPersons([])
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setNewName('')
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const f = JSON.stringify(event.target.value.toLowerCase())
    setFilter(f)
    console.log(f);
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const contains = persons.some(elem => {
      return JSON.stringify(nameObject.name) === JSON.stringify(elem.name)
    })

    if (newName !== '' && !contains) {
      personsService.create(nameObject).then(() => {
        setPersons(persons.concat(nameObject))
        setMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      }
      )

    } else if (contains) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const updateThisPerson = persons.filter(person => person.name === newName)[0]
        personsService.update(updateThisPerson.id, nameObject)
          .then(() => {
            const updateObject = {
              ...nameObject,
              id: updateThisPerson.id
            }
            setPersons(persons.map(person => person.name === updateObject.name ? person = updateObject : person))

            setMessage(`Updated ${nameObject.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          }
          )
          .catch(error => {
            setErrorMessage(`Information of ${nameObject.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== updateThisPerson.id))
          })
      }
    }

  }

  const deletePerson = id => {
    const name = persons.filter(person => person.id === id)[0].name

    if (window.confirm(`Delete ${name}`))
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setMessage(`Deleted ${name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        )
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Error message={errorMessage} />
      <Notification message={message} />

      <FilterField handler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson} />
    </div>
  )

}

export default App