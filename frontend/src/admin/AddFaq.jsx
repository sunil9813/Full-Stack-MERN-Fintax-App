import React, { useState } from "react"
import { Border, Card, SubHeading, Title } from "../components/common/ui/Design"
import { useDispatch, useSelector } from "react-redux"
import { createFaq, selectIsLoading } from "../redux/fetaures/FaqSlice"
import { FaqTable } from "./FaqTable"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/common/Loader"

const initialState = {
  title: "",
  description: "",
}

export const AddFaq = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [faq, setFaq] = useState(initialState)

  const isLoading = useSelector(selectIsLoading)

  const { title, description } = faq

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFaq({ ...faq, [name]: value })
  }

  const saveBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)

    await dispatch(createFaq(formData))
    window.location.reload(true)
    navigate("/add-faq")
  }
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={saveBlog}>
        <Card>
          <Border>
            <Title>Add Faq</Title>
            <div>
              <SubHeading>Question</SubHeading>
              <input type='text' name='title' value={faq?.title} onChange={handleInputChange} placeholder='Write your title' className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0' />
            </div>
            <div>
              <SubHeading>Answer</SubHeading>
              <textarea cols='30' rows='10' type='text' name='description' value={faq?.description} onChange={handleInputChange} className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'></textarea>
            </div>
            <br />
            <button type='submit' className='py-2 px-8 bg-indigo-500 text-white rounded-md'>
              Create
            </button>
          </Border>
        </Card>
      </form>

      <FaqTable />
    </>
  )
}
