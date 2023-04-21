import React, { useEffect, useState } from "react"
import { Border, Card, SubHeading, Title } from "../components/common/ui/Design"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../components/common/Loader"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getAboutId, selectAbout, selectIsLoading, updateAbout } from "../redux/fetaures/AboutSlice"

export const EditAbout = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsLoading)

  const aboutEdit = useSelector(selectAbout)

  const [about, setAbout] = useState(aboutEdit)
  const [aboutImg, setAboutImg] = useState("")
  const [imagePreview, setimagePreview] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    dispatch(getAboutId(id))
  }, [dispatch, id])

  useEffect(() => {
    setAbout(aboutEdit)
    setimagePreview(aboutEdit && aboutEdit.image ? `${aboutEdit.image.filePath}` : null)
    setDescription(aboutEdit && aboutEdit.description ? aboutEdit.description : "")
  }, [aboutEdit])

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
    formData.append("title", about?.title)
    formData.append("description", description)

    if (aboutImg) {
      formData.append("image", aboutImg)
    }
    await dispatch(updateAbout({ id, formData }))
    await dispatch(getAboutId())
    navigate("/add-about")
  }

  return (
    <>
      <section className='add-blog'>
        {isLoading && <Loader />}

        {aboutEdit && (
          <form onSubmit={saveBlog}>
            <Card>
              <Title>Edit blog</Title>
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
                      alt='imagePreview'
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
                    modules={EditAbout.modules}
                    formats={EditAbout.formats}
                  />
                </div>

                <br />
                <button type='submit' className='py-2 px-8 bg-indigo-500 text-white rounded-md'>
                  Update
                </button>
              </Border>
            </Card>
          </form>
        )}
      </section>
    </>
  )
}
EditAbout.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ],
}
EditAbout.formats = [
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
