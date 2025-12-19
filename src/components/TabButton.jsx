import React from 'react'

const TabButton = ({active , selectTab ,children}) => {
const buttonClasses= active ?  'text-[#ADB7BE] border-b-2 border-purple-500' : 'text-[#ADB7BE]'

  return (
  
        <button onClick={selectTab}>
        <p className={`mr-3 font-semibold hover:text-white cursor-pointer ${buttonClasses}`}>
       {children}
       </p>
    </button>
  )
};

export default TabButton
