import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Ingredients = ({ title, ingre }) => {
  const [name, setName] = useState(title && title)
  const [ingredients, setIngredients] = useState(ingre && ingre)

  useEffect(() => {
    setName(title && title)
    setIngredients(ingre && ingre)
  }, [ingre])

  const navigate = useNavigate()

  return (
    <>
      <h2>{name && name}</h2>
      <Table striped bordered hover className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Ingredient</th>
            <th>Method</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {ingredients &&
            ingredients.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/*  {ingredients && ingredients.map((item,i)=><li key={i}>{item.name})} */}

      <button
        className='go-back'
        onClick={() => navigate('../', { replace: true })}
      >
        Go Back
      </button>
    </>
  )
}

export default Ingredients
