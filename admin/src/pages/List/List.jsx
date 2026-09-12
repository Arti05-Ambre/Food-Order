import React from 'react'
import './List.css'
import axios from "axios"
const List = () => {

  const url ="http://localhost:4000s"
  const [list,setList]=useState([]);
  const fetchlist = async ()=>{
    const response = await axios.get()

  }
  return (
    <div>
      
    </div>
  )
}

export default List
