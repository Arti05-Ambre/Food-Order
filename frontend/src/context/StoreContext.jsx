
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreProvider = (props) => {

  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])

  const url = "https://food-order-backend-4e0u.onrender.com" 
 
  // Add item to cart 
  const addToCart = async (itemId) => { 
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

    if(token){ 
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}}) 
    } 
  } 
 
  // Remove item from cart 
  const removeFromCart = async (itemId) => { 
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: prev[itemId] - 1 
    })); 
    if(token){ 
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
 
    } 
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
    
      const response = await axios.get( 
        url + "/api/food/list"); 
 
      setFoodList(response.data.data) 
 
    }  
     
  const loadCartData = async(token)=>{ 
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    )

    setCartItems(response.data.cartData); 
  } 
     
   
 
  // Load food list and token 
 useEffect(() => { 
 
 async function loadData(){ 
  await fetchFoodList(); 
  if(localStorage.getItem("token")){ 
    setToken(localStorage.getItem("token")); 
    await loadCartData(localStorage.getItem("token")); 
  } 
 } 
 loadData(); 
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
