import React, { useState, useEffect } from 'react'
import { client } from '../client'
import cn from "classnames";
import { ReactComponent as Next } from "../assets/down.svg";
import { ReactComponent as Prev } from "../assets/up.svg";


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
  

  /*Import Vertical Carousel*/
  const [activeIndex, setActiveIndex] = useState(0);

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.length / 2);

  // Used to determine the height/spacing of each item
  const itemHeight = 52;

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    // If these match, the item is active
    // Position item in the center of list
    if (activeIndex === itemIndex) return 0;
   // Targeting items in the second part of the list
    if (itemIndex >= halfwayIndex) {
      // If moving backwards from index 0 to the last item, move the value downwards
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        // Negative value moves upwards towards the top of the list
        return -(data.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        // If we are at the end of the carousel, set the index to 0
        if (prevIndex + 1 > data.length - 1) {
          return 0;
        }
        // Otherwise increment the index by 1
        return prevIndex + 1;
      }
      // If we are on the first slide and click previous, go to the last slide
      if (prevIndex - 1 < 0) {
        return data.length - 1;
      }
      // We are moving backwards in the carousel, decrement index by 1
      return prevIndex - 1;
    });
  }; 
  /*Import Vertical Carousel*/

useEffect(() => {
    getData()
  }, [])
console.log(data)
 
  
  

  return (
    <div className="container">
      <section className="outer-container">

        /*Start of the Orange container*/

        <div className="carousel-wrapper">
          <button
            type="button"
            className="carousel-button prev"
            onClick={() => handleClick("prev")}
          >
            <Prev />
          </button>

          <div className="carousel">
            <div className="leading-text">
              <p></p>
            </div>
            <div className="slides">
              <div className="carousel-inner">
                {data.map((item, i) => (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn("carousel-item", {
                      active: activeIndex === i,
                      visible:
                        Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                    })}
                    key={item.id}
                    style={{
                      transform: `translateY(${determinePlacement(i)}px)`
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="carousel-button next"
            onClick={() => handleClick("next")}
          >
            <Next />
          </button>
        </div>

        /*End of Orange container*/

        <div className="content">
          <img
            src={data[activeIndex].imageURL}
            alt={data[activeIndex].name}
          />
          <p>{data[activeIndex].name}</p>
        </div>
      </section>
    </div>
  );
}

export default VerticalCarousel
