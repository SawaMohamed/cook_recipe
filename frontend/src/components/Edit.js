import React, { useState, useEffect } from 'react'
import { produce } from 'immer'
import { generate } from 'shortid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Ingredients from './Ingredients'
import Steps from './Steps'

const Edit = ({ data }) => {
  // const [formValue, setFormValue] = useState()
  const [id, setId] = useState(Number)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [steps, setSteps] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [newRecipe, setNewRecipe] = useState({
    name: data && data.name,
    steps: data && data.steps,
    ingredients: data && data.ingredients,
    url: data && data.url,
  })
  useEffect(() => {
    if (newRecipe) {
      setNewRecipe({
        id: data && data.recipe_id,
        name: name && name,
        steps: steps && steps,
        ingredients: ingredients && ingredients,
        url: url && url,
      })
    }
    setId(data && data)
  }, [name, url, steps, ingredients, id, data])

  // @desc      Create new recipe and post to heroku db
  const editRecipe = async (e, newRecipe) => {
    e.preventDefault()
    // setNewRecipe()
    const { name, steps, ingredients, url, id } = newRecipe
    let ingreToString = [{}]
    ingredients &&
      ingredients.forEach((e, i) => {
        JSON.stringify(e)
        ingreToString.push(e)
      })

    ingreToString.join('')
    ingreToString && ingreToString.shift()
    // ingreToString&&setIngredients
    let rToSql = {
      id,
      name,
      steps,
      ingredients: ingreToString,
      url,
    }
    try {
      await axios.put(
        `https://grouponerecipe.herokuapp.com/api/v1/recipes`,
        rToSql
      )
      console.log(rToSql)
      window.location.reload()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      {/* Steps section start */}
      <div className='ingredients-section'>
        <button
          onClick={() => {
            setSteps(steps => [...steps, ''])
          }}
        >
          Update Step
        </button>
        {steps.map((p, index) => {
          return (
            <div key={p.id}>
              <input
                required
                onChange={e => {
                  const step = e.target.value
                  setSteps(currentIngredients =>
                    produce(currentIngredients, v => {
                      v[index] = step
                    })
                  )
                }}
                value={p}
                placeholder='Step'
              />

              <button
                onClick={() => {
                  setSteps(currentIngredients =>
                    currentIngredients.filter(x => x.id !== p.id)
                  )
                }}
              >
                x
              </button>
            </div>
          )
        })}
      </div>
      {/* Steps section end */}

      {/* ingredients section start */}
      <div className='ingredients-section'>
        <button
          onClick={() => {
            setIngredients(ingredients => [
              ...ingredients,
              {
                name: '',
                type: '',
                quantity: '',
              },
            ])
          }}
        >
          Update Ingredients
        </button>
        {ingredients.map((p, index) => {
          return (
            <div key={p.id}>
              <input
                required
                onChange={e => {
                  const name = e.target.value
                  setIngredients(currentIngredients =>
                    produce(currentIngredients, v => {
                      v[index].name = name
                    })
                  )
                }}
                value={p.name}
                placeholder='Name'
              />
              <input
                required
                onChange={e => {
                  const type = e.target.value
                  setIngredients(currentIngredients =>
                    produce(currentIngredients, v => {
                      v[index].type = type
                    })
                  )
                }}
                value={p.type}
                placeholder='Type'
              />
              <input
                required
                onChange={e => {
                  const quantity = e.target.value
                  setIngredients(currentIngredients =>
                    produce(currentIngredients, v => {
                      v[index].quantity = quantity
                    })
                  )
                }}
                value={p.quantity}
                placeholder='Quantity'
              />
              <button
                onClick={() => {
                  setIngredients(currentIngredients =>
                    currentIngredients.filter(x => x.id !== p.id)
                  )
                }}
              >
                x
              </button>
            </div>
          )
        })}
      </div>
      {/* ingredients section end */}

      {/* form for name and image start */}
      <form
        className='form-create-recipe'
        action='submit'
        onSubmit={e => editRecipe(e, newRecipe)}
      >
        <input
          type='text'
          placeholder='Recipe Name'
          className='search-input'
          aria-label='text'
          value={name}
          onInput={e => setName(e.target.value)}
          autoFocus
          required
        />

        <input
          type='text'
          placeholder='Image URL'
          className='search-input'
          aria-label='text'
          value={url}
          onInput={e => setUrl(e.target.value)}
        />

        <button className='search-button' type='submit'>
          Submit
        </button>
      </form>
      {/* form for name and image end */}
    </>
  )
}

export default Edit
