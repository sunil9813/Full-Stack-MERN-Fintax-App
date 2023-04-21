import React from "react"
import { TbArrowNarrowRight } from "react-icons/tb"

export const TitleXl = ({ title }) => {
  return (
    <>
      <div className='heading-xl capitalize relative h-96 mobile:h-48 w-full flex items-center justify-center flex-col text-white'>
        <h1 className='text-6xl font-semibold relative z-10'>{title}</h1>
        <div className='flex justify-center items-center z-10 mt-5'>
          <b>Home</b>
          <TbArrowNarrowRight size={25} className='mx-2' />
          <b>Services</b>
        </div>
      </div>
    </>
  )
}
export const TitleMd = ({ title }) => {
  return (
    <>
      <div className='heading-md text-slate-800 capitalize'>
        <h1 className='text-4xl font-semibold relative z-10'>{title}</h1>
      </div>
    </>
  )
}
export const TitleSm = ({ title }) => {
  return (
    <>
      <div className='heading-sm text-indigo-600 capitalize'>
        <h1 className='text-xl font-medium relative z-10'>{title}</h1>
      </div>
    </>
  )
}
