import React, { useState } from "react"
import LogoImg from "../assets/images/logo.png"
import { NavLink } from "react-router-dom"
import { icons, navBar } from "../assets/data/dummydata"
import { ButtonPrimary, ButtonRound } from "./ui/Button"
import { useSelector } from "react-redux"
import { selectName } from "../../redux/fetaures/auth/authSlice"
import { ShowOnLogOut, ShowOnLogin } from "../../routers/HiddenLink"
import { HiMenuAlt1 } from "react-icons/hi"
import { RxCrossCircled } from "react-icons/rx"

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const name = useSelector(selectName)

  return (
    <>
      <Head />
      <header className='py-3'>
        <div className='containers flex justify-between items-center'>
          <div className='logo'>
            <img src={LogoImg} alt='LogoImg' />
          </div>
          <nav className={openMenu ? "mobileMenu" : ""}>
            <ul className='flex justify-between items-center'>
              {navBar.map((links, i) => (
                <li
                  className='text-[17px] capitalize font-medium mr-8'
                  key={i}
                  onClick={() => setOpenMenu(null)}
                >
                  <NavLink to={links.path}>{links.name}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className='menu-button'
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <RxCrossCircled size={25} /> : <HiMenuAlt1 size={25} />}
          </button>
          <div className='right flex items-center md:hidden mobile:hidden'>
            <ShowOnLogOut>
              <NavLink to='/login'>
                <ButtonPrimary text='Login' color='bg-indigo-500' />
              </NavLink>
            </ShowOnLogOut>
            <ShowOnLogin>
              <NavLink to='/dashboard' className=' shadow-shadow2 rounded-full'>
                <ButtonRound icon={name.slice(0, 1)} color='indigo-500' />
              </NavLink>
            </ShowOnLogin>
          </div>
        </div>
      </header>
    </>
  )
}

export const Head = () => {
  return (
    <div className='Head bg-secondary text-white mobile:hidden'>
      <div className='containers flex justify-between items-center py-2'>
        <div className='left flex justify-between items-center'>
          <p> Looking for Best Insurance Company?</p>
          <span className='bg-indigo-500 text-sm px-3 py-1 rounded-lg mx-5 md:hidden'>
            Call : +000(123)456989
          </span>
          <NavLink
            to='https://fiscall.finance/'
            className='bg-indigo-500 text-sm px-3 py-1 rounded-lg md:hidden'
          >
            Open Our Product
          </NavLink>
        </div>
        <div className='right flex justify-between items-center'>
          {icons.map((icons, i) => (
            <NavLink
              to='/'
              key={i}
              className='w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-gray-300 ml-3'
            >
              {icons.icon}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
