import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navigation = props => {
  const [input, setInput] = useState('')
  // const [sendInput, setSendInput] = useState('')

  const commitInput = e => {
    e.preventDefault()
    setInput(input)
  }

  useEffect(() => {
    props.func(input)
  }, [input])

  props.func(input)

  return (
    <nav className='navbar'>
      <form action='submit' onSubmit={commitInput}>
        <input
          type='search'
          placeholder='Search for recipe'
          className='search-input'
          aria-label='Search'
          value={input}
          onInput={e => setInput(e.target.value)}
          autoFocus
        />
        <button className='search-button' type='submit'>
          Submit
        </button>
      </form>

      <ul className='nav-list'>
        <li>
          <Link to='/'>Recipe</Link>
        </li>
        <li>
          <Link to='/ingredients'>Ingredients</Link>
        </li>
        <li>
          <Link to='/steps'>Steps</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
