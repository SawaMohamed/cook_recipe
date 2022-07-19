import React from "react";
import { Link } from 'react-router-dom'



function Steps() {
 
    return(
        <div>
           <Link to="/"  className="btn">Steps</Link>  
           <Link to="/ingredients" className="btn">Ingredients</Link>  
            
        </div>
    )
}
export default Steps
 
 
