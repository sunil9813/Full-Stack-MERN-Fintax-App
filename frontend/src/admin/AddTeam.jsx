import React, { useState } from "react"
import { TeamList } from "./TeamList"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/common/Loader"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Border, Card, SubHeading, Title } from "../components/common/ui/Design"
import { createTeam, selectIsLoading } from "../redux/fetaures/TeamSlice"

const initialState = {
  title: "",
}

export const AddTeam = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [team, setTeam] = useState(initialState)
  const [teamImg, setTeamImg] = useState("")
  const [imagePreview, setimagePreview] = useState(null)

  const isLoading = useSelector(selectIsLoading)

  const { name, post } = team

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTeam({ ...team, [name]: value })
  }

  const handleImageChange = (e) => {
    setTeamImg(e.target.files[0])
    setimagePreview(URL.createObjectURL(e.target.files[0]))
  }
  const saveTeam = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("post", post)
    formData.append("image", teamImg)

    await dispatch(createTeam(formData))
    window.location.reload(true)
    navigate("/add-team")
  }
  return (
    <>
      <section className='add-services'>
        {isLoading && <Loader />}
        <form onSubmit={saveTeam}>
          <Card>
            <Title>Create Team</Title>
            <Border>
              <div>
                <SubHeading>Name</SubHeading>
                <input
                  type='text'
                  name='name'
                  value={team?.name}
                  onChange={handleInputChange}
                  placeholder='Write your sub title'
                  className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
                />
              </div>
              <div>
                <SubHeading>Post</SubHeading>
                <input
                  type='text'
                  name='post'
                  value={team?.post}
                  onChange={handleInputChange}
                  placeholder='Write your sub title'
                  className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
                />
              </div>
              <div>
                <SubHeading>Image</SubHeading>
                <input
                  type='file'
                  name='image'
                  onChange={(e) => handleImageChange(e)}
                  className='h-58 bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'
                />
              </div>
              {imagePreview !== null ? (
                <div>
                  <img
                    src={imagePreview}
                    alt='aboutImg'
                    width='100%'
                    height='100%'
                    className='mt-5 rounded-lg w-full h-48 object-cover'
                  />
                </div>
              ) : (
                <p>No Image set for this blog</p>
              )}
              <br />
              <button type='submit' className='py-2 px-8 bg-indigo-500 text-white rounded-md'>
                Create
              </button>
            </Border>
          </Card>
        </form>

        <br />
        <TeamList />
      </section>
    </>
  )
}
