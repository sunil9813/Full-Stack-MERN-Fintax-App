import React, { useState } from "react"
import { SubHeading, Title } from "../../components/common/ui/Design"
import { ButtonPrimary } from "../../components/common/ui/Button"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { registerUser } from "../../redux/services/authServices"
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME } from "../../redux/fetaures/auth/authSlice"
import { Loader } from "../../components/common/Loader"
import useRedirectLoggedOutUser from "../../components/customeHook/useRedirectLoggedOutUser"

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const Register = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, confirmPassword } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const register = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error("All Fileds are required")
    }

    if (password?.length < 8) {
      return toast.error("Password  must be upto 8 characters")
    }

    if (password !== confirmPassword) {
      return toast.error("Password doesn't match")
    }

    const userData = {
      name,
      email,
      password,
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(false))
      await dispatch(SET_NAME(data.name))
      setIsLoading(false)
      navigate("/dashboard")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }
  return (
    <>
      <section className='register bg-gray-50 py-16'>
        {isLoading && <Loader />}
        <div className='max-w-md m-auto '>
          <form
            onSubmit={register}
            className='bg-gray-50 p-8 shadow-shadow2 rounded-2xl border-[6px] border-white'
          >
            <Title>Register</Title>
            <div>
              <SubHeading>name</SubHeading>
              <input
                type='text'
                name='name'
                value={name}
                onChange={handleInputChange}
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>
            <div>
              <SubHeading>email</SubHeading>
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>
            <div>
              <SubHeading>password</SubHeading>
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleInputChange}
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>
            <div>
              <SubHeading>confirm password</SubHeading>
              <input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleInputChange}
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>

            <div className='capitalize flex mt-3'>
              <span>create a new profile</span>
              <NavLink
                to='/login'
                className='block ml-2 text-indigo-500 capitalize'
              >
                login
              </NavLink>
            </div>
            <br />
            <ButtonPrimary text='register' color='bg-indigo-500' />
          </form>
        </div>
      </section>
    </>
  )
}
