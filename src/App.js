import React, { useState, useEffect } from 'react'
import './App.css'
import VerticalCarousel from './components/VerticalCarousel'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [current, setCurrent] = useState({})
  const [img, setImg] = useState({})
  const [fields, setFields] = useState({})
  const [file, setFile] = useState({})

  const pull_bg_image = data => {
    setCurrent(data && data)
    setImg(current && current.imageUrl)
    setFields(img && img.fields)
    setFile(fields && fields.file)
    return
  }

  useEffect(() => {
    pull_bg_image()
  }, [])

  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${file && file.url})`,
        }}
        className='App'
      >
        <VerticalCarousel func={pull_bg_image} />
      </div>
    </BrowserRouter>
  )
}

export default App
