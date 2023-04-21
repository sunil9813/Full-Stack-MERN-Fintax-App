import React, { useEffect } from "react"
import { Card } from "../components/common/ui/Design"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectIsLoggedIn } from "../redux/fetaures/auth/authSlice"
import { deleteBlog, getAllBlogs } from "../redux/fetaures/BlogSlice"
import { Loader } from "../components/common/Loader"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEditAlt } from "react-icons/bi"
import useRedirectLoggedOutUser from "../components/customeHook/useRedirectLoggedOutUser"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { deleteCareer, getAllCareers } from "../redux/fetaures/CareerSlice"

export const CareerList = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { careers, isLoading, isError, message } = useSelector((state) => state.career)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllCareers())
    }

    if (isError) {
      toast.error(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const delBlog = async (id) => {
    await dispatch(deleteCareer(id))
    await dispatch(getAllCareers())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Career!!!",
      message: "Are you sure to do delete career.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delBlog(id),
        },
        {
          label: "Cancel",
        },
      ],
    })
  }
  return (
    <>
      <Card>
        <section className='relative overflow-x-auto'>
          {isLoading && <Loader />}
          {!isLoading && careers?.length === 0 ? (
            <h1>No Blog Found!</h1>
          ) : (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Job Title
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Salary
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Image
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {careers.map((blog, index) => (
                  <tr className='bg-white border-b hover:bg-gray-50' key={index}>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                      {index + 1}
                    </th>
                    <td className='px-6 py-4'>{blog.title?.slice(0, 80)}</td>
                    <td className='px-6 py-4'>{blog.salary}</td>
                    <td className='px-6 py-4'>
                      {blog?.image ? (
                        <img
                          src={blog.image.filePath}
                          alt={blog.image.filename}
                          className='object-cover w-14 h-10 rounded-lg'
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className='px-6 py-4 flex justify-between items-center'>
                      <button onClick={() => confirmDelete(blog._id)}>
                        <RiDeleteBin6Line size={20} className=' text-red-500' />
                      </button>
                      <NavLink to={`/edit-blog/${blog._id}`}>
                        <BiEditAlt size={20} className=' text-green-500' />
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </Card>
    </>
  )
}
