import React, { useState, useEffect } from 'react'
import { client } from '../client'

const VerticalCarousel = () => {
  const [data, setData] = useState()
  
  const getData = async () => {
    try {
      const { items } = await client.getEntries()
      setData(items.map(i => i.fields))
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getData()
    console.log(data)
  }, [])
  return <div>VerticalCarousel</div>
}

export default VerticalCarousel
