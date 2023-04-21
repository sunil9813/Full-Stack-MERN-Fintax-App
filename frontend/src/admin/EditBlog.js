import React, { useEffect, useState } from "react"
import { Border, Card, SubHeading, Title } from "../components/common/ui/Design"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getBlogId, selectBlog, selectIsLoading, updateBlog } from "../redux/fetaures/BlogSlice"
import { Loader } from "../components/common/Loader"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const EditBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsLoading)

  const blogEdit = useSelector(selectBlog)

  const [blog, setBlog] = useState(blogEdit)
  const [blogImg, setBlogImg] = useState("")
  const [imagePreview, setimagePreview] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    dispatch(getBlogId(id))
  }, [dispatch, id])

  useEffect(() => {
    setBlog(blogEdit)
    setimagePreview(blogEdit && blogEdit.image ? `${blogEdit.image.filePath}` : null)
    setDescription(blogEdit && blogEdit.description ? blogEdit.description : "")
  }, [blogEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBlog({ ...blog, [name]: value })
  }

  const handleImageChange = (e) => {
    setBlogImg(e.target.files[0])
    setimagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const saveBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", blog?.title)
    formData.append("description", description)

    if (blogImg) {
      formData.append("image", blogImg)
    }
    console.log(...formData)
    await dispatch(updateBlog({ id, formData }))
    await dispatch(getBlogId())
    navigate("/add-blog")
  }

  return (
    <>
      <section className='add-blog'>
        {isLoading && <Loader />}

        {blogEdit && (
          <form onSubmit={saveBlog}>
            <Card>
              <Title>Edit blog</Title>
              <Border>
                <div>
                  <SubHeading>Title</SubHeading>
                  <input
                    type='text'
                    name='title'
                    value={blog?.title}
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
                    modules={EditBlog.modules}
                    formats={EditBlog.formats}
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
EditBlog.modules = {
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
EditBlog.formats = [
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
