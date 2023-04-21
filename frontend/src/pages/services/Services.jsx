import React, { useEffect } from "react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import { TitleMd, TitleSm, TitleXl } from "../../components/common/ui/Title"
import { useDispatch, useSelector } from "react-redux"
import { getAllServices } from "../../redux/fetaures/ServiceSlice"
import { toast } from "react-toastify"
import DOMPurify from "dompurify"
import { Loader } from "../../components/common/Loader"

export const Services = () => {
  return (
    <>
      <section className='services relative'>
        <TitleXl title='Service' />
        <ServicesCard />
      </section>
    </>
  )
}

export const ServicesCard = () => {
  const dispatch = useDispatch()

  const { services, isLoading, isError, message } = useSelector(
    (state) => state.service
  )

  useEffect(() => {
    dispatch(getAllServices())

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])

  return (
    <div className='containers py-16'>
      <TitleSm title='What we offer' />
      <div className='heading flex justify-between mt-5 md:flex-col'>
        <div className='w-1/3 md:w-full'>
          <TitleMd title='Key Features For your Insurance Business' />
        </div>
        <div className='flex justify-end w-2/3 md:flex-col md:w-full'>
          <p className='text-lg'>
            Sit amet consectetur adipiscing elites varius montes, massa blandit
            orci. Sed egestas tellus est aliquet egetristique nisullam pharetra
            sed tempor sed eivera consectetur augue
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
      <div className='grid grid-cols-3 gap-8 mt-10 md:grid-cols-1 mobile:grid-cols-1'>
        {services.map((items) => (
          <div className='card relative' key={items._id}>
            <div className='card-img h-[460px] rounded-xl'>
              {items?.image ? (
                <img
                  src={items.image.filePath}
                  alt={items.image.filename}
                  className='object-cover w-full h-full rounded-3xl'
                />
              ) : (
                <div className='bg-indigo-500 h-full w-full rounded-3xl flex justify-center items-center '>
                  <h1 className='text-img-none font-bold'>FA</h1>
                </div>
              )}
            </div>
            <div className='card-details absolute bottom-0 left-0 m-8 p-8 bg-white rounded-lg'>
              <div className='icon'>
                <span className='text-6xl mb-5 block'>{items.icon}</span>
              </div>
              <h2 className='text-2xl font-semibold'>
                {items.title?.slice(0, 50)}...
              </h2>
              <div
                className='my-3'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(items.description.slice(0, 120)),
                }}
              ></div>
              <div className='card-link flex items-center font-semibold text-md text-indigo-600'>
                <NavLink to='/'>Read More</NavLink>
                <HiArrowNarrowRight size={20} className='ml-1' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
