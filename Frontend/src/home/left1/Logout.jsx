import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import Cookies from "js-cookie"

const Logout = () => {
 const [loading,setLoading] = useState(false)
  const handleLogout = async()=>{
    setLoading(true)
    try {
     const res =  await axios.post("/api/user/logout")
     localStorage.removeItem("messenger")
     Cookies.remove("jwt")
     setLoading(false)
        alert("Logout Successfully")
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
    <div className="w-[4%]   bg-blue-300 text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
          <button>
            <RiLogoutCircleRLine 
              className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"
              onClick={handleLogout}
            />
          </button>
        </div>
      </div>
    
      
    </>
  )
}

export default Logout
