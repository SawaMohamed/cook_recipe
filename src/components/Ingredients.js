import React from 'react'
import { Link } from 'react-router-dom'
const Ingredients = ({data}) => {
console.log(data);
  return (
    <div>
      Ingredients
      <Link to='/steps'>Steps</Link>
    </div>
  )
}

export default Ingredients
