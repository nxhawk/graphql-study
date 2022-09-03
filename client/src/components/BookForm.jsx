import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
//{}
import { useMutation, useQuery } from '@apollo/client'
import { getAuthors, getBooks } from '../graphql-client/queries'
import { addSingleBook } from '../graphql-client/mutations'

const BookForm = () => {

  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  })

  const onInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId
      },
      refetchQueries: [{ query: getBooks }]
    })
    setNewBook({
      name: '',
      genre: '',
      authorId: ''
    })
  }

  const { loading, error, data } = useQuery(getAuthors)

  const [addBook, dataMutation] = useMutation(addSingleBook)

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type='text' placeholder='Book name' value={newBook.name} onChange={onInputChange} name='name' />
      </Form.Group>
      <Form.Group className='my-3'>
        <Form.Control type='text' placeholder='Book genre' value={newBook.genre} name='genre' onChange={onInputChange} />
      </Form.Group>
      <Form.Group>
        {loading ? <p>Loading Authors...</p> :
          <Form.Control as='select' onChange={onInputChange} name='authorId' value={newBook.authorId}>
            <option disabled value=''>Select author</option>
            {data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
          </Form.Control>
        }
      </Form.Group>
      <Button className="float-right mt-3" variant='info' type='submit'>Add book</Button>
    </Form>
  )
}

export default BookForm