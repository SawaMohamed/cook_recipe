import React from 'react'
import { useNavigate } from 'react-router-dom'

const Steps = ({ steps }) => {
  const navigate = useNavigate()

  return (
    <>
      <ol className='steps-ul'>
        {steps &&
          steps[0] &&
          steps[0].map((item, i) => <li key={i}>{i + item}</li>)}
      </ol>
      <button
        className='go-back'
        onClick={() => navigate('../', { replace: true })}
      >
        Go Back
      </button>
    </>
  )
}

export default Steps
