import React from 'react'
import { RiLogoutCircleRLine } from "react-icons/ri";

const Logout = () => {
  return (
    <>
    <div className="w-[4%]   bg-blue-300 text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
          <button>
            <RiLogoutCircleRLine 
              className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"
              
            />
          </button>
        </div>
      </div>
    
      
    </>
  )
}

export default Logout
