import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreProvider = (props) => {

  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])

  const url = "http://localhost:4000"

  // Add item to cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1
      }))
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1
      }))
    }
  }

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }))
  }

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0

    for (const item in cartItems) {
      if (cartItems[item] > 0) {

        const itemInfo = food_list.find(
          (product) => product._id === item
        )

        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price
        }
      }
    }

    return totalAmount
  }

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        url + "/api/food/list"
      )

      setFoodList(response.data.data)

    } catch (error) {
      console.log("Error fetching food list:", error)
    }
  }

  // Load food list and token
  useEffect(() => {

    const loadData = async () => {

      await fetchFoodList()

      const savedToken = localStorage.getItem("token")

      if (savedToken) {
        setToken(savedToken)
      }

    }

    loadData()

  }, [])

  // Context values
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

