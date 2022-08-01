import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Recipe = props => {
  const [img, setImg] = useState(props.currentRecipe.url)
  const [name, setName] = useState(props.currentRecipe.name)
  useEffect(() => {
    setImg(props && props.currentRecipe.url)
    setName(props && props.currentRecipe.name)
  }, [props])

  return (
    <>
      <div
        className='recipe-component'
        style={{
          backgroundImage: `url(${img && img})`,
        }}
      >
        <h2>{name}</h2>
      </div>
    </>
  )
}

export default Recipe
