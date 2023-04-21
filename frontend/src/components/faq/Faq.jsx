import React, { useEffect, useState } from "react"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { getAllFaqs } from "../../redux/fetaures/FaqSlice"
import { toast } from "react-toastify"

export const Faq = () => {
  const dispatch = useDispatch()

  const { faqs, isError, message } = useSelector((state) => state.faq)

  useEffect(() => {
    dispatch(getAllFaqs())

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])

  const [open, setOpen] = useState(null)
  const toggle = (i) => {
    if (open === i) {
      return setOpen(null)
    }
    setOpen(i)
  }
  return (
    <>
      <section className='faq'>
        {faqs.map((list, i) => (
          <div className=' bg-indigo-100 rounded-md mb-8' key={i}>
            <div className='title flex justify-between items-center px-5 py-2'>
              <h2 className='text-lg font-semibold'>{list.title}</h2>
              {open === i ? (
                <button
                  onClick={() => toggle(i)}
                  className='flex justify-center items-center shadow-lg w-12 h-12 rounded-md transition-all ease-in-out rotate-90  bg-white  text-indigo-500'
                >
                  <HiOutlineArrowNarrowRight />
                </button>
              ) : (
                <button
                  onClick={() => toggle(i)}
                  className='flex justify-center items-center text-white shadow-lg bg-indigo-500 w-12 h-12 rounded-md transition-all ease-in-out hover:rotate-90 hover:bg-white hover:text-indigo-500'
                >
                  <HiOutlineArrowNarrowRight />
                </button>
              )}
            </div>
            <div className={open === i ? "details px-7 pb-5 visible" : "hidden"}>
              <p className='leading-8'>{list.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
