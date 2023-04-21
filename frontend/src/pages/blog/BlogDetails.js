import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getBlog } from "../../redux/fetaures/BlogSlice"
import { toast } from "react-toastify"
import { Loader } from "../../components/common/Loader"
import DOMPurify from "dompurify"

const BlogDetails = () => {
  const dispatch = useDispatch()

  const { slug } = useParams()

  const { blog, isLoading, isError, message } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(getBlog(slug))

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])
  return (
    <>
      <section className='w-3/4 m-auto py-8'>
        {isLoading && <Loader />}

        {blog && (
          <div className='details'>
            <div className='img'>
              {blog?.image ? (
                <img
                  src={blog.image.filePath}
                  alt={blog.image.filename}
                  className='object-cover w-full h-full rounded-3xl'
                />
              ) : (
                <div className='bg-indigo-500 h-full w-full rounded-3xl flex justify-center items-center '>
                  <h1 className='text-img-none font-bold'>FA</h1>
                </div>
              )}
            </div>
            <h1 className='text-2xl my-6 font-medium text-indigo-500'>{blog.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.description),
              }}
            ></div>
          </div>
        )}
      </section>
    </>
  )
}

export default BlogDetails
