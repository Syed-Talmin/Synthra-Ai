import React from 'react'

const PopUpWrapper = ({children}) => {
  return (
    <div className='fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
        {children}
    </div>
  )
}

export default PopUpWrapper