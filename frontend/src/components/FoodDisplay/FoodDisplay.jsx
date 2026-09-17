import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  // Selected category items first
  const sortedFoodList = [...food_list].sort((a, b) => {
    if (category === 'All') return 0

    if (a.category === category && b.category !== category) {
      return -1
    }

    if (a.category !== category && b.category === category) {
      return 1
    }

    return 0
  })

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className='food-display-list'>
        {sortedFoodList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay