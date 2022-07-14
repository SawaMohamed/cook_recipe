import React, { useState, useEffect } from 'react'
import './App.css'
import VerticalCarousel from './components/VerticalCarousel'

function App() {
  const [bk, setBk] = useState()
  const [url, setUrl] = useState(
    '//images.ctfassets.net/8shhe87vbcl2/6qcUzzVC3l1v1KIwWp4JvZ/2c4e766bcccf581fb833cea17e4089e6/picVfzLZo.jpg'
  )
  //to get value from search bar

  const pull_bg_image = img => {
    setBk(img)
    return
  }

  useEffect(() => {
    pull_bg_image()
    return () => {
      if (bk) {
        console.log(bk.fields.file.url)
        setUrl(bk.fields.file.url)
      }
    }
  }, [bk])

  return (
    <div
      style={{
        backgroundImage: `url(${url && url})`,
      }}
      className='App'
    >
      <VerticalCarousel func={pull_bg_image} />
    </div>
  )
}

export default App
