import React, { useState, useEffect } from 'react'
import { LINK, Routes, Route } from 'react-router-dom'
import { client } from '../client'
import cn from 'classnames'
import Recipe from './Recipe'
import { ReactComponent as Next } from '../assets/down.svg'
import { ReactComponent as Prev } from '../assets/up.svg'
import Nav from './Nav'
import Ingredients from './Ingredients'
import Steps from './Nav'
const VerticalCarousel = (props) => {
  const [data, setData] = useState([])
  const [bk, setBk] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentImg, setCurrentImg] = useState({})

  
  
  const getData = async () => {
    try {
      let arr = []
      const { items } = await client.getEntries()
      items.map(i => arr.push(i.fields))
      setData(arr)
      // setCurrentImg(arr[activeIndex + 1])
    } catch (error) {
      console.error(error)
    }
     
  }

    //to get value from search bar 
    const pull_bg_image = img => {
      setBk(img)
      return
    }
  useEffect(() => {
    getData()

  }, [])
  useEffect(() => {
    setCurrentImg(data[activeIndex + 1])
  }, [data])
  
  useEffect(() => {
    setCurrentImg(data[activeIndex])
    pull_bg_image()
    props.func(bk)
  }, [activeIndex])

  /*Import Vertical Carousel*/

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.length / 2)
 
  // Usd to determine the height/spacing of each item
  const itemHeight = 52

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2

  const determinePlacement = itemIndex => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight
      } else {
        return -(data.length + activeIndex - itemIndex) * itemHeight
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.length - (activeIndex - itemIndex)) * itemHeight
      }
      return -(activeIndex - itemIndex) * itemHeight
    }
  }

  const handleClick = direction => {
    setActiveIndex(prevIndex => {
      if (direction === 'next') {
        if (prevIndex + 1 > data.length - 1) {
          return 0
        }
        return prevIndex + 1
      }

      if (prevIndex - 1 < 0) {
        return data.length - 1
      }

      return prevIndex - 1
    })
  }
  /*Import Vertical Carousel*/

  
  return (
    <div className='container'>
      <section className='outer-container'>
        {/* Start of the Orange container */}
        <div className='carousel-wrapper'>
          <button
            type='button'
            className='carousel-button prev'
            onClick={() => handleClick('prev')}
          >
            <Prev />
            
          </button>

          <div className='carousel'>
            <div className='slides'>
              <div className='carousel-inner'>
                {data.map((item, i) => (
                  <button
                    type='button'
                    onClick={() => setActiveIndex(i)}
                    className={cn('carousel-item', {
                      active: activeIndex === i,
                      visible:
                        Math.abs(determinePlacement(i)) <=
                        visibleStyleThreshold,
                    })}
                    key={i}
                    style={{
                      transform: `translateY(${determinePlacement(i)}px)`,
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type='button'
            className='carousel-button next'
            onClick={() => handleClick('next')}
          >
           
            <Next />
          </button>
        </div>
        {/* End of Orange container */}
        <div className='content'>
          <Routes>
            <Route path='/ingredients' element={<Ingredients/>}/>
            <Route path='/steps' element={<Steps/>}/>
            <Route path='/' element={currentImg && <Recipe func={pull_bg_image} currentImg={currentImg} />}/>
          </Routes>
        
          {currentImg && <Nav func={pull_bg_image} currentImg={currentImg} />}
        </div>
      </section>
    </div>
  )
}


export default VerticalCarousel
