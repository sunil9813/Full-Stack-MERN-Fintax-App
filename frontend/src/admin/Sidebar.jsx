import React from "react"
import { HiOutlineUserGroup, HiOutlineViewGrid } from "react-icons/hi"
import { GoDiffAdded } from "react-icons/go"
import { IoIosLogOut } from "react-icons/io"
import { NavLink, useNavigate } from "react-router-dom"
import { GrAddCircle } from "react-icons/gr"
import { FiPhoneCall } from "react-icons/fi"
import {
  AiOutlineDollarCircle,
  AiOutlineFileAdd,
  AiOutlineQuestionCircle,
} from "react-icons/ai"
import { SlHandbag } from "react-icons/sl"
import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/services/authServices"
import { SET_LOGIN } from "../redux/fetaures/auth/authSlice"

export const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    await logoutUser()
    await dispatch(SET_LOGIN(false))
    navigate("/login")
  }
  const data = [
    {
      id: 1,
      name: "dashboard",
      path: "/dashboard",
      icon: <HiOutlineViewGrid />,
    },
    {
      id: 2,
      name: "about us",
      path: "/add-about",
      icon: <GoDiffAdded />,
    },
    {
      id: 3,
      name: "service",
      path: "/add-service",
      icon: <GrAddCircle />,
    },
    {
      id: 4,
      name: "blog",
      path: "/add-blog",
      icon: <AiOutlineFileAdd />,
    },
    {
      id: 5,
      name: "team",
      path: "/add-team",
      icon: <HiOutlineUserGroup />,
    },
    /* {
      id: 6,
      name: "price",
      path: "/add-price",
      icon: <AiOutlineDollarCircle />,
    },*/
    {
      id: 7,
      name: "career",
      path: "/add-career",
      icon: <SlHandbag />,
    },
    {
      id: 8,
      name: "faq",
      path: "/add-faq",
      icon: <AiOutlineQuestionCircle />,
    },
    {
      id: 11,
      name: "inquiry",
      path: "/inquiry-list",
      icon: <FiPhoneCall />,
    },
    {
      id: 9,
      name: "login",
      path: "/login",
      icon: <SlHandbag />,
    },
    {
      id: 10,
      name: "register",
      path: "/register",
      icon: <SlHandbag />,
    },
  ]
  return (
    <div className='adminsidebar w-1/4 bg-white shadow-shadow2  py-8 min-h-screen'>
      <ul>
        {data.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              className='flex items-center text-md px-5 py-2 mb-1 capitalize border-l-4 border-transparent'
            >
              <span className='mr-2'>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={logout}
            className='flex items-center text-md px-5 py-2 mb-1 capitalize border-l-4 border-transparent'
          >
            <span className='mr-2'>
              <IoIosLogOut />
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
