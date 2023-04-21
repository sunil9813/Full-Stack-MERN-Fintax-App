import React, { useEffect } from "react"
import { Card } from "../components/common/ui/Design"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectIsLoggedIn } from "../redux/fetaures/auth/authSlice"
import { Loader } from "../components/common/Loader"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEditAlt } from "react-icons/bi"
import useRedirectLoggedOutUser from "../components/customeHook/useRedirectLoggedOutUser"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { deleteService, getAllServices } from "../redux/fetaures/ServiceSlice"

export const ServiceTableList = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { services, isLoading, isError, message } = useSelector((state) => state.service)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllServices())
    }

    if (isError) {
      toast.error(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const delBlog = async (id) => {
    await dispatch(deleteService(id))
    await dispatch(getAllServices())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Blog!!!",
      message: "Are you sure to do delete blog.",
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
          {!isLoading && services?.length === 0 ? (
            <h1>No Service Found!</h1>
          ) : (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Title
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
                {services.map((service, index) => (
                  <tr className='bg-white border-b hover:bg-gray-50' key={index}>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                      {index + 1}
                    </th>
                    <td className='px-6 py-4'>{service.title?.slice(0, 50)}</td>
                    <td className='px-6 py-4'>
                      {service?.image ? (
                        <img
                          src={service.image.filePath}
                          alt={service.image.filename}
                          className='object-cover w-14 h-10 rounded-lg'
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className='px-6 py-4 flex justify-between items-center'>
                      <button onClick={() => confirmDelete(service._id)}>
                        <RiDeleteBin6Line size={20} className=' text-red-500' />
                      </button>
                      <NavLink to={`/edit-service/${service._id}`}>
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
