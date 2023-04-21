import React, { useState } from "react"
import { SubHeading, Title } from "../../components/common/ui/Design"
import { ButtonPrimary } from "../../components/common/ui/Button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { loginUser } from "../../redux/services/authServices"
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME } from "../../redux/fetaures/auth/authSlice"
import { Loader } from "../../components/common/Loader"

const initialState = {
  email: "",
  password: "",
}

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const login = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("All Fileds are required")
    }

    const userData = {
      email,
      password,
    }
    setIsLoading(true)
    try {
      const data = await loginUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      setIsLoading(false)
      navigate("/dashboard")
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  return (
    <>
      <section className='login bg-gray-50 py-16'>
        {isLoading && <Loader />}
        <div className='max-w-md m-auto '>
          <form
            onSubmit={login}
            className='bg-gray-50 p-8 py-24 shadow-shadow2 rounded-2xl border-[6px] border-white'
          >
            <Title>Log in</Title>
            <div>
              <SubHeading>Email</SubHeading>
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                placeholder='fintax@gmail.com'
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>
            <br />
            <div>
              <SubHeading>password</SubHeading>
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleInputChange}
                placeholder='*******'
                className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
              />
            </div>
            <br />
            <ButtonPrimary text='login' color='bg-indigo-500' />
          </form>
        </div>
      </section>
    </>
  )
}
