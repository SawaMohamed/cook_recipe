import React, { useState, useEffect } from 'react'

const Recipe = props => {
  const [img, setImg] = useState({})
  const { currentImg } = props
  const { name, imageUrl, ingredients, steps } = currentImg
  // const { fields } = imageUrl
  useEffect(() => {
    setImg(imageUrl && imageUrl)
    props.func(imageUrl)
  }, [imageUrl])
  // console.log(img.fields && img.fields.file.url)

  return (
    <>
      <div
        className='recipe-component'
        style={{
          backgroundImage: `url(${img.fields && img.fields.file.url})`,
        }}
      >
        <h2>{name}</h2>
      </div>
    </>
  )
}

export default Recipe
