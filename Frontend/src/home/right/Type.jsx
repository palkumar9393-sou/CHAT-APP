import React from 'react'
import { IoSend } from "react-icons/io5";

const Type = () => {
  return (
    <>
    

      <div className="flex space-x-1 h-[8vh] text-center bg-blue-400">
        <div className=" w-[90%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            className="border-[1px] border-gray-700  flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-blue-800 mt-1"
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
      
    

    
    
    </>
  )
}

export default Type
