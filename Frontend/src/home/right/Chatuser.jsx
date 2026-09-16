import React from 'react'

const Chatuser = () => {
  return (
    <>
      <div className=' pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-blue-400 hover:bg-slate-400 duration-300'>
        <div>
        <div className= " avatar online" >
          <div className="w-14 rounded-full ">
             <img src="https://media.licdn.com/dms/image/v2/D4D03AQGf-qu_KUiU5Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729500780156?e=1790812800&v=beta&t=CgJDRd48XhljsKl_8dOSf0aVUC2S6ImeoVQoWOhvEQI"/>
        
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-xl'>
          Sourav Pal
        </h1>
        <span className='text-sm'>Online</span>
      </div>
      </div>
    </>
  )
}

export default Chatuser
