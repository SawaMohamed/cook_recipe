import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Table from 'react-bootstrap/Table'


const Steps = ({currentRecipe}) => {
const [current , setCurrent ] = useState({})
const [name, setName] = useState("")
const [steps , setSteps ] = useState([])


  useEffect(() => {
    setCurrent(currentRecipe&&currentRecipe)
    setName(current&&current.name)
    setSteps(current&&current.steps)
    
  }, [currentRecipe])

  console.log(name)
  
  const navigate= useNavigate();

  return (
    <>
    <div>
      <h2>{name}</h2>
      <ul className="steps-ul">
      {steps &&steps.map((item,i)=>(<li key={i}>{item}</li>
          ))}
      </ul>
         
                 {/*  {ingredients && ingredients.map((item,i)=><li key={i}>{item.name})} */}
              
        
        <button onClick={()=> navigate("../", { replace: true })}>Back</button> 
      </div>
    </>
  );
};

export default Steps


