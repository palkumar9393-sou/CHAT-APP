import React from 'react'

const User = () => {
  return (
    <div>
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className= " avatar online" >
          <div className="w-12 rounded-full ">
             <img src="https://media.licdn.com/dms/image/v2/D4D03AQGf-qu_KUiU5Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729500780156?e=1790812800&v=beta&t=CgJDRd48XhljsKl_8dOSf0aVUC2S6ImeoVQoWOhvEQI"/>
        
          </div>
        </div>
        <div>
        <h1>
          Sourav Pal
        </h1>
        <span>Sourav@gmail.com</span>
      </div>
    </div>
    </div>
  )
}

export default User
