import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useMutation } from '@apollo/client'
import { getAuthors } from '../graphql-client/queries'
import { addSingleAuthor } from '../graphql-client/mutations'
//{}
const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    age: '',
  })

  const onInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addAuthor({
      variables: {
        name: newAuthor.name,
        age: +newAuthor.age,
      },
      refetchQueries: [{ query: getAuthors }]
    })
    setNewAuthor({
      name: '',
      age: '',
    })
  }

  const [addAuthor, dataMutation] = useMutation(addSingleAuthor)

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='invisible'>
        <Form.Control />
      </Form.Group>
      <Form.Group className='my-3'>
        <Form.Control type='text' placeholder='Author name' name='name' value={newAuthor.name} onChange={onInputChange} />
      </Form.Group>
      <Form.Group >
        <Form.Control type='number' placeholder='Author age' name='age' value={newAuthor.age} onChange={onInputChange} />
      </Form.Group>
      <Button className="float-right mt-3" variant='info' type='submit'>Add author</Button>
    </Form>
  )
}

export default AuthorForm