import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { client } from '../client'
import cn from 'classnames'
import Recipe from './Recipe'
import Ingredients from './Ingredients'
import Navigation from './Navigation'
import { ReactComponent as Next } from '../assets/down.svg'
import { ReactComponent as Prev } from '../assets/up.svg'
import Steps from './Steps'
import 'bootstrap/dist/css/bootstrap.min.css'

const VerticalCarousel = props => {
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [bk, setBk] = useState({})

  const getData = async () => {
    try {
      let arr = []
      const { items } = await client.getEntries()
      items.map(i => arr.push(i.fields))
      setData(arr)
    } catch (error) {
      console.error(error)
    }
  }

  props.func(data[activeIndex])
  const returnBG = () => props.func(data[activeIndex])

  // pull search value from search bar
  const get_search = data => {
    setSearchValue(data)
    console.log(data)
    return
  }

  // find value matching search bar from the data array
  const findSearchFomData=()=>{
    let arr=[]
    arr=data.filter(i=>i.name.toLowerCase().includes(searchValue.toLowerCase()))
    setData(arr)
  }
  
  useEffect(() => {
    getData()
    setCurrentRecipe(data[activeIndex])
    returnBG()
  }, [])

  useEffect(() => {
    setCurrentRecipe(data[activeIndex])
    setBk(currentRecipe && currentRecipe)
    returnBG()
  }, [data])

  useEffect(() => {
    setCurrentRecipe(data[activeIndex])
    returnBG()
  }, [activeIndex])

  useEffect(() => {
    findSearchFomData()
  
  }, [searchValue])
  useEffect(() => {
    // findSearchFomData()
    getData()
  
  }, [searchValue.length===0])
  
  
  /*Import Vertical Carousel*/

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.length / 2)

  // Usd to determine the height/spacing of each item
  const itemHeight = Math.floor(data.length * 4)

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = Math.floor(halfwayIndex * itemHeight)

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = Math.floor(shuffleThreshold / 2)

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
      <Navigation func={get_search} />
      <>
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
              {currentRecipe && (
                <Route
                  path='/'
                  element={<Recipe currentRecipe={currentRecipe} />}
                />

              )}
              <Route path='/ingredients' element={<Ingredients currentRecipe={currentRecipe}/>}/>
              <Route path='/steps' element={<Steps currentRecipe={currentRecipe}/>}/>
            </Routes>
          </div>
        </section>
      </>
    </div>
  )
}

export default VerticalCarousel
