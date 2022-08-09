import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'
// import { client } from '../client'
import cn from 'classnames'
import Recipe from './Recipe'
import Create from './Create'
import Edit from './Edit'
import Navigation from './Navigation'
import Ingredients from './Ingredients'
import Steps from './Steps'
import { ReactComponent as Next } from '../assets/down.svg'
import { ReactComponent as Prev } from '../assets/up.svg'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa'

// import 'bootstrap/dist/css/bootstrap.min.css'

const VerticalCarousel = props => {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [ingre, setIngre] = useState([])
  const [bk, setBk] = useState('')
  const [steps, setSteps] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [x, setX] = useState('')
  const [y, setY] = useState([{}, {}])
  const [fromSearchBar, setFromSearchBar] = useState(false)
  const [id, setId] = useState(Number)
  // get all data from contentful filter them and return ass json

  //   const fromContentful = arr => {
  // let newArr=[]
  // arr.map( (i)=> {
  //   // just change the shape od data accordingly
  //   newArr.push( {
  //       name: i.name,
  //       steps: i.steps,
  //       ingredients: i.ingredients,
  //       imageUrl:i.imageUrl.fields.file.url
  //   })
  // })
  //     console.log(JSON.stringify(newArr))
  //   }

  // @desc       get data from contentful
  // const getData = async () => {
  //   try {
  //     let arr = []
  //     const { items } = await client.getEntries()
  //     items.map(i => arr.push(i.fields))
  //     // setData(arr)

  //     fromContentful(arr)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // @desc      get data from sql
  const dataSql = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/api/v1/recipes')
      const res = await axios.get(
        'https://grouponerecipe.herokuapp.com/api/v1/recipes'
      )
      setData(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  // @desc      get selected data from sql
  const selectedSql = async () => {
    try {
      const res = await axios.get(
        `https://grouponerecipe.herokuapp.com/api/v1/recipes/${searchValue}`
      )
      setData(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  // @desc      Delete selected data from sql according to id
  const deleteRecipe = async id => {
    try {
      await axios.delete(
        `https://grouponerecipe.herokuapp.com/api/v1/recipes/${id}`
      )
      dataSql()
    } catch (error) {
      console.error(error.message)
    }
  }

  props.func(data[activeIndex])
  const returnBG = () => props.func(data[activeIndex])

  // pull search value from search bar
  const get_search = v => {
    if (v && v !== undefined) {
      setSearchValue(v)
    } else {
      setSearchValue('')
    }
    return
  }

  //  NOTE This function for contentful only
  // find value matching search bar from the data array
  // const findSearchFomData = () => {
  //   let arr = []
  //   arr = data.filter(i =>
  //     i.name.toLowerCase().includes(searchValue.toLowerCase())
  //   )
  //   setData(arr)
  // ,[]}

  // siting all data like img name steps ingredients from currentRecipe
  const setAllData = () => {
    setIngre(() => {
      let arr = []
      currentRecipe &&
        currentRecipe.ingredients &&
        currentRecipe.ingredients[0][0]
          .slice(1)
          .slice(0, -1)
          .split('},{')
          .map(e => {
            arr.push(JSON.parse(`{${e}}`))
          })
      return arr
    })
    setName(currentRecipe && currentRecipe.name)
    setBk(currentRecipe && currentRecipe.url)
    setSteps(currentRecipe && currentRecipe.steps)
    setId(currentRecipe && currentRecipe.recipe_id && currentRecipe.recipe_id)
  }

  useEffect(() => {
    dataSql()
    setCurrentRecipe(data[activeIndex])
    returnBG()
    get_search()
  }, [])

  // change the data if recipe was selected from search bar
  useEffect(() => {
    get_search()
    if (searchValue && searchValue.length > 0) {
      selectedSql()
    }
  }, [searchValue])

  // change the data if recipe was selected from carousel
  useEffect(() => {
    setAllData()
  }, [currentRecipe])

  // chose the current recipe and background form app.js and recipe.js when data loaded
  useEffect(() => {
    setCurrentRecipe(data[activeIndex])
    setBk(currentRecipe && currentRecipe)
    returnBG()
  }, [data])

  // change current recipe when choosing from the carousel
  useEffect(() => {
    setCurrentRecipe(data[activeIndex])
    returnBG()
  }, [activeIndex])

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
      <div className='options'>
        <Link to='/create'>
          <Button className='recipe-btn create'>
            <FaPlus />
          </Button>
        </Link>
        <Link to='/edit'>
          <Button className='recipe-btn edit'>
            <FaEdit />
          </Button>
        </Link>
        <Button onClick={() => deleteRecipe(id)} className='recipe-btn delete'>
          <FaTrashAlt />
        </Button>
      </div>
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
              {/* <Link to='/'> */}
              <Prev />
              {/* </Link> */}
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
                      {/* <Link to='/'> */}
                      {item.name}
                      {/* </Link> */}
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
              {/* <Link to='/'> */}
              <Next />
              {/* </Link> */}
            </button>
          </div>
          {/* End of Orange container */}
          <div className='content'>
            <Routes>
              {currentRecipe && (
                <Route
                  path='/'
                  element={
                    <Recipe currentRecipe={currentRecipe && currentRecipe} />
                  }
                />
              )}

              <Route
                path='/ingredients'
                element={
                  <Ingredients title={name && name} ingre={ingre && ingre} />
                }
              />
              <Route path='/steps' element={<Steps steps={steps && steps} />} />
              <Route path='/create' element={<Create />} />
              <Route
                path='/edit'
                element={<Edit data={currentRecipe && currentRecipe} />}
              />
            </Routes>
          </div>
        </section>
      </>
    </div>
  )
}

export default VerticalCarousel
