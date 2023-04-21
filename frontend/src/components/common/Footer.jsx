import React from "react"
import { FaHeadphones } from "react-icons/fa"
import { BiTimeFive } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { footer1, footer2, icons } from "../assets/data/dummydata"
import footerImg from "../assets/images/footerlogo.png"
import footerImg1 from "../assets/images/shield.png"
import { ButtonRound } from "./ui/Button"

export const Footer = () => {
  return (
    <>
      <footer className='bg-secondary py-16 text-white'>
        <div className='containers'>
          <div className='grid grid-cols-4 gap-5 md:grid-cols-2 mobile:grid-cols-1'>
            <div className='box'>
              <img src={footerImg} alt='footerImg' />
              <p className='text-lg my-10'>
                Sed ut perspiciatis unde omnis iste natus errors voluptatem
                accusantium doloremque laudantium totam remy aperiam eaque quae
                abilloy
              </p>

              <h3 className='text-xl font-medium my-3'>Follow Us</h3>
              <div className='right flex items-center'>
                {icons.map((icons, i) => (
                  <NavLink
                    key={i}
                    to='/'
                    className='w-12 h-12 flex items-center justify-center text-lg bg-[rgba(255,255,255,0.1)] rounded-full mr-3 transition duration-700 ease-in-out hover:bg-indigo-500'
                  >
                    {icons.icon}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className='box'>
              <h3 className='text-xl font-medium my-3'>Services</h3>

              <ul className='mt-8'>
                {footer1.map((item, ind) => (
                  <li
                    key={ind}
                    className='mb-3 transition ease-in-out duration-700 hover:text-indigo-500 hover:cursor-pointer'
                  >
                    <NavLink
                      to={item.path}
                      className='flex items-center text-lg'
                    >
                      <i>{item.icon}</i>
                      <span className='ml-2'>{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='box'>
              <h3 className='text-xl font-medium my-3'>Other Pages</h3>
              <ul className='mt-8'>
                {footer2.map((item, index) => (
                  <li
                    key={index}
                    className='mb-3 transition ease-in-out duration-700 hover:text-indigo-500 hover:cursor-pointer'
                  >
                    <NavLink
                      to={item.path}
                      className='flex items-center text-lg'
                    >
                      <i>{item.icon}</i>
                      <span className='ml-2'>{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='box'>
              <h3 className='text-xl font-medium my-3'>Newsletter</h3>
              <p className='my-5'>
                Sed ut perspiciatis unde omniste natus errors volupta accus
              </p>

              <div className='bg-white px-1 py-1 w-full rounded-lg flex justify-between items-center my-8'>
                <input
                  type='text'
                  placeholder='Your email address'
                  className='text-para py-2.5 w-2/3'
                />
                <button className='capitalize bg-indigo-500 px-5 py-2.5 text-white rounded-md w-1/3 ml-0.5'>
                  Sign up
                </button>
              </div>
              <div className='flex items-center'>
                <div>
                  <ButtonRound
                    icon={<FaHeadphones size={22} />}
                    color='indigo-500'
                  />
                </div>
                <div className='ml-3'>
                  <span>Need Help?</span>
                  <h2 className='text-xl font-semibold mt-1'>
                    +000(123)456 88
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footerBottom bg-[#1D3050] py-4 mt-16'>
          <div className='containers flex justify-between items-center mobile:flex-col'>
            <div className='flex items-center mobile:mb-2'>
              <img
                src={footerImg1}
                alt='footerImg1'
                className='w-8 h-8 object-cover mr-3'
              />
              <p>Copyright 2023, Vankine. All Rights Reserved</p>
            </div>
            <div className='flex justify-end items-center'>
              <i>
                <BiTimeFive size={25} />
              </i>
              <p className='ml-2 transition ease-in-out duration-700 hover:text-indigo-500 hover:cursor-pointer'>
                Working Hours : Sun-monday, 09am-5pm
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
