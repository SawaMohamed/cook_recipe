import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table'


const Ingredients = ({currentRecipe}) => {
const [current , setCurrent ] = useState({})
const [name, setName] = useState("")
const [ingredients , setIngredients ] = useState([])
const [img, setImg] = useState({})

  useEffect(() => {
    setCurrent(currentRecipe&&currentRecipe)
    setName(current&&current.name)
    setIngredients(current&&current.ingredients)
    setImg(current&&current.imgUrl)
  }, [currentRecipe])

  console.log(name)
  
  const navigate= useNavigate();

  return (
    <>
    <div>
      <h2>{name}</h2>
      <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ingredient</th>
          <th>Method</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {ingredients &&ingredients.map((item,i)=>(<tr key={i}>
          <td>{i+1}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.quantity}</td>
        </tr>))}
      
      </tbody>
    </Table>
         
                 {/*  {ingredients && ingredients.map((item,i)=><li key={i}>{item.name})} */}
              
        
        <button onClick={()=> navigate("../", { replace: true })}>Back</button> 
      </div>
    </>
  );
};

export default Ingredients


