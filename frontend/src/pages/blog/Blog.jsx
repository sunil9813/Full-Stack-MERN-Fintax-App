import React, { useEffect } from "react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import { TitleXl } from "../../components/common/ui/Title"
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from "../../redux/fetaures/BlogSlice"
import { toast } from "react-toastify"
import { Loader } from "../../components/common/Loader"
import DOMPurify from "dompurify"

export const Blog = () => {
  return (
    <>
      <section className='team relative'>
        <TitleXl title='Blog' />
        <BlogCard />
      </section>
    </>
  )
}

export const BlogCard = () => {
  const dispatch = useDispatch()

  const { blogs, isLoading, isError, message } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(getAllBlogs())

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])

  return (
    <div className='containers py-16'>
      {isLoading && <Loader />}
      <div className='grid grid-cols-3 gap-8 mt-10 md:grid-cols-2 mobile:grid-cols-1'>
        {!isLoading && blogs?.length === 0 ? (
          <h1>No Blog Found!</h1>
        ) : (
          blogs.map((blog) => {
            return (
              <div className='team-card relative shadow-md rounded-3xl' key={blog._id}>
                <div className='h-60'>
                  {blog?.image ? (
                    <img src={blog.image.filePath} alt={blog.image.filename} className='object-cover w-full h-full rounded-3xl' />
                  ) : (
                    <div className='bg-indigo-500 h-full w-full rounded-3xl flex justify-center items-center '>
                      <h1 className='text-img-none font-bold'>FA</h1>
                    </div>
                  )}
                </div>
                <div className='blog-details py-5 px-8'>
                  <h3 className='text-lg font-medium my-3 text-secondary transition-all ease-in-out hover:text-indigo-500'>{blog.title.slice(0, 120)}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blog.description.slice(0, 120)),
                    }}
                  ></div>

                  <div className='my-4 flex items-center justify-between'>
                    <div className='flex items-center font-semibold text-md text-indigo-600'>
                      <NavLink to={`/blog/${blog.slug}`}>Read More</NavLink>
                      <HiArrowNarrowRight size={20} className='ml-1' />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
