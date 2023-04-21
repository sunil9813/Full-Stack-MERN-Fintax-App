import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/common/Loader"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Border, Card, SubHeading, Title } from "../components/common/ui/Design"
import { createAbout, selectIsLoading } from "../redux/fetaures/AboutSlice"
import { AboutList } from "./AboutList"

const initialState = {
  title: "",
}
export const AddAbout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [about, setAbout] = useState(initialState)
  const [aboutImg, setAboutImg] = useState("")
  const [imagePreview, setimagePreview] = useState(null)
  const [description, setDescription] = useState("")

  const isLoading = useSelector(selectIsLoading)

  const { title } = about

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAbout({ ...about, [name]: value })
  }

  const handleImageChange = (e) => {
    setAboutImg(e.target.files[0])
    setimagePreview(URL.createObjectURL(e.target.files[0]))
  }
  const saveBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", aboutImg)

    await dispatch(createAbout(formData))
    console.log(...formData)
    window.location.reload(true)
    navigate("/add-about")
  }
  return (
    <section className='add-about'>
      {isLoading && <Loader />}
      <form onSubmit={saveBlog}>
        <Card>
          <Title>Create About Us</Title>
          <Border>
            <div>
              <SubHeading>Title</SubHeading>
              <input
                type='text'
                name='title'
                value={about?.title}
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

            <div>
              <SubHeading>Description</SubHeading>
              <ReactQuill
                theme='snow'
                value={description}
                onChange={setDescription}
                modules={AddAbout.modules}
                formats={AddAbout.formats}
              />
            </div>

            <br />
            <button
              type='submit'
              className='py-2 px-8 bg-indigo-500 text-white rounded-md'
            >
              Create
            </button>
          </Border>
        </Card>
      </form>

      <br />
      <AboutList />
    </section>
  )
}
AddAbout.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
}
AddAbout.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
]
