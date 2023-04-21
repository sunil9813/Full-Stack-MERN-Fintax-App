import React from "react"

export const ButtonPrimary = ({ icon, text, color }) => {
  return (
    <>
      <button
        className={
          color
            ? `${color} capitalize px-8 py-2.5 text-white rounded-xl flex justify-center items-center`
            : `bg-primary capitalize px-8 py-2.5 text-white rounded-xl flex justify-center items-center`
        }
      >
        <span>{text}</span>
        {icon && <i className='ml-3'>{icon}</i>}
      </button>
    </>
  )
}

export const ButtonRound = ({ icon, color }) => {
  return (
    <>
      <button className={`capitalize bg-${color} text-white rounded-full w-12 h-12 flex items-center justify-center`}>
        {icon}
      </button>
    </>
  )
}
export const ButtonRoundMd = ({ icon }) => {
  return (
    <>
      <button className={`capitalize bg-white text-pirmary rounded-full w-9 h-9 flex items-center justify-center`}>
        {icon}
      </button>
    </>
  )
}
