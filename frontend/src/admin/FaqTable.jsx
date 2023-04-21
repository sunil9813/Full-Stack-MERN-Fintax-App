import React, { useEffect } from "react"
import { Card } from "../components/common/ui/Design"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectIsLoggedIn } from "../redux/fetaures/auth/authSlice"
import { Loader } from "../components/common/Loader"
import { RiDeleteBin6Line } from "react-icons/ri"
import useRedirectLoggedOutUser from "../components/customeHook/useRedirectLoggedOutUser"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { deleteFaq, getAllFaqs } from "../redux/fetaures/FaqSlice"

export const FaqTable = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { faqs, isLoading, isError, message } = useSelector((state) => state.faq)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllFaqs())
    }

    if (isError) {
      toast.error(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const delBlog = async (id) => {
    await dispatch(deleteFaq(id))
    await dispatch(getAllFaqs())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Faq!!!",
      message: "Are you sure to do delete faq.",
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
          {!isLoading && faqs?.length === 0 ? (
            <h1>No Blog Found!</h1>
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((blog, index) => (
                  <tr className='bg-white border-b hover:bg-gray-50' key={index}>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                      {index + 1}
                    </th>
                    <td className='px-6 py-4'>{blog.title?.slice(0, 80)}</td>
                    <td className='px-6 py-4 flex justify-between items-center'>
                      <button onClick={() => confirmDelete(blog._id)}>
                        <RiDeleteBin6Line size={20} className=' text-red-500' />
                      </button>
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
