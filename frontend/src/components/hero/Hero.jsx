import React from "react"
import { GiTronArrow } from "react-icons/gi"
import { ButtonPrimary } from "../common/ui/Button"
import homeImg from "../assets/images/Image-man.png"

export const Hero = () => {
  return (
    <>
      <section className='hero bg-[#F6F6F6] h-[90vh] relative md:h-[50vh]'>
        <div className='containers py-16 flex justify-between items-center'>
          <div className='absolute top-16 -left-10 w-[600px] h-[600px] bg-white rounded-full shadow-sm md:hidden'></div>
          <div className='left w-1/2 relative z-10 pl-24 md:w-full md:pl-0'>
            <h3 className='flex items-center text-2xl capitalize font-semibold text-indigo-500'>
              <span>
                <GiTronArrow size={25} />
              </span>
              <span className='ml-3'>best For insurance </span>
            </h3>
            <h1 className='text-[70px] mb-10 leading-snug font-bold capitalize text-secondary mobile:text-5xl mobile:mt-10'>
              A moments <br /> of caring your <br /> dream home
            </h1>
            <ButtonPrimary text='get started' color='bg-indigo-500' />
          </div>
          <div className='right w-1/2 md:hidden'>
            <img src={homeImg} alt='homeImg' />
          </div>
        </div>
      </section>
    </>
  )
}
