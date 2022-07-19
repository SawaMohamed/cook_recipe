import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Recipe = props => {
  const [img, setImg] = useState(props.currentRecipe.imageUrl)
  const [name, setName] = useState(props.currentRecipe.name)

  useEffect(() => {
    setImg(props.currentRecipe.imageUrl)
    setName(props.currentRecipe.name)
  }, [props])

  return (
    <>
      <div
        className='recipe-component'
        style={{
          backgroundImage: `url(${img && img.fields.file.url})`,
        }}
      >
        <h2>
          <Link to='/' style={{ textDecoration: 'none' }}>
            {name}
          </Link>
        </h2>
      </div>
    </>
  )
}

export default Recipe