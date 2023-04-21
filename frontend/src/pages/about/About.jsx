import React, { useEffect } from "react"
import { TitleMd, TitleXl } from "../../components/common/ui/Title"
import aboutImg from "../../components/assets/images/about.png"
import { BsArrowRight, BsArrowUpRight, BsFillCheckCircleFill } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import { GiCherish, GiHumanTarget, GiLaurelsTrophy } from "react-icons/gi"
import { HiOutlineUserGroup } from "react-icons/hi"
import { SiAlwaysdata } from "react-icons/si"
import { SlLike } from "react-icons/sl"
import { VscFeedback } from "react-icons/vsc"
import { BiTrendingUp } from "react-icons/bi"
import { getAllAbouts } from "../../redux/fetaures/AboutSlice"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import DOMPurify from "dompurify"

export const About = () => {
  return (
    <>
      <section className='about relative'>
        <TitleXl title='About Us' />
        <AboutCard />
      </section>
    </>
  )
}

export const AboutCard = () => {
  const dispatch = useDispatch()

  const { abouts, isLoading, isError, message } = useSelector((state) => state.about)

  useEffect(() => {
    dispatch(getAllAbouts())

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])

  return (
    <>
      {abouts.map((about, index) => (
        <div className='containers py-16 flex md:flex-col-reverse' key={index}>
          <div className='left w-2/5 h-[50vh] md:w-full md:mt-8'>
            {about?.image ? (
              <img
                src={about.image.filePath}
                alt={about.image.filename}
                className='rounded-xl object-cover h-full w-full'
                width='100%'
                height='100%'
              />
            ) : (
              <div className='bg-indigo-500 h-full w-full rounded-3xl flex justify-center items-center '>
                <h1 className='text-img-none font-bold'>FA</h1>
              </div>
            )}
          </div>
          <div className='right w-3/6 ml-16 md:w-full md:m-0'>
            <div className='heading'>
              <TitleMd title={about.title} />
            </div>
            <div
              className='my-8'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(about.description),
              }}
            ></div>
          </div>
        </div>
      ))}
      <div className='company-ach my-16 py-32 bg-indigo-500 text-white'>
        <div className='containers'>
          <div className='heading text-center'>
            <p className='text-lg mb-5'>Company Statistics Analysis</p>
            <h1 className='text-5xl'>Great Achievement For Insurance</h1>
          </div>
          <div className='grid grid-cols-5 gap-7 mt-16 md:grid-cols-3 md:place-items-center md:text-center mobile:grid-cols-1 '>
            <div className='box'>
              <div className='icons flex items-center justify-center w-32 h-32 bg-white shadow-shadow1 rounded-full md:m-auto'>
                <SlLike size={80} className='text-indigo-500' />
              </div>
              <div className=' text-left md:text-center'>
                <h1 className='text-4xl font-bold mt-5 mb-3'>8563 +</h1>
                <h3 className='text-xl font-semibold'>Saticfied Custimer</h3>
              </div>
            </div>
            <div className='box'>
              <div className='icons flex items-center justify-center w-32 h-32 bg-white shadow-shadow1 rounded-full md:m-auto'>
                <GiHumanTarget size={80} className='text-indigo-500' />
              </div>
              <div className=' text-left md:text-center'>
                <h1 className='text-4xl font-bold mt-5 mb-3'>2630 +</h1>
                <h3 className='text-xl font-semibold'>Experience Members</h3>
              </div>
            </div>
            <div className='box'>
              <div className='icons flex items-center justify-center w-32 h-32 bg-white shadow-shadow1 rounded-full md:m-auto'>
                <VscFeedback size={80} className='text-indigo-500' />
              </div>
              <div className=' text-left md:text-center'>
                <h1 className='text-4xl font-bold mt-5 mb-3'>100 %</h1>
                <h3 className='text-xl font-semibold'>Satisfaction Rate</h3>
              </div>
            </div>
            <div className='box'>
              <div className='icons flex items-center justify-center w-32 h-32 bg-white shadow-shadow1 rounded-full md:m-auto'>
                <BiTrendingUp size={80} className='text-indigo-500' />
              </div>
              <div className=' text-left md:text-center'>
                <h1 className='text-4xl font-bold mt-5 mb-3'>25 +</h1>
                <h3 className='text-xl font-semibold'>25 + Years Experience</h3>
              </div>
            </div>
            <div className='box'>
              <div className='icons flex items-center justify-center w-32 h-32 bg-white shadow-shadow1 rounded-full md:m-auto'>
                <GiLaurelsTrophy size={80} className='text-indigo-500' />
              </div>
              <div className='text-left md:text-center'>
                <h1 className='text-4xl font-bold mt-5 mb-3'>963 +</h1>
                <h3 className='text-xl font-semibold'>Awards Winning</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='content containers text-center pb-16'>
        <div className='heading '>
          <p className='text-lg text-indigo-500'>Great Offer For Customer</p>
          <TitleMd title='Amazing Features For Insurance' />
        </div>
        <div className='boxs grid grid-cols-3 gap-8 mt-12 md:grid-cols-2 mobile:grid-cols-1'>
          <div className='box px-8 py-12 rounded-2xl bg-indigo-50 border border-indigo-200 hover:border-indigo-500 transition-all ease-in-out  '>
            <div className='flex items-center justify-center w-40 h-40 m-auto bg-white shadow-shadow1 rounded-full'>
              <GiCherish size={80} className='text-indigo-500' />
            </div>
            <h2 className='text-2xl mt-10 text-indigo-500 font-semibold'>Insurance Services</h2>
            <p className='py-3 text-lg'>
              Sed ut perspiciatis unde omnis natus errr voluptatem accusantium doloremue laudant totam
            </p>
            <NavLink to='/' className='flex items-center justify-center capitalize font-semibold'>
              read more <BsArrowRight className='ml-2' />
            </NavLink>
          </div>
          <div className='box px-8 py-12 rounded-2xl bg-indigo-50 border border-indigo-200 hover:border-indigo-500 transition-all ease-in-out  '>
            <div className='flex items-center justify-center w-40 h-40 m-auto bg-white shadow-shadow1 rounded-full'>
              <HiOutlineUserGroup size={80} className='text-indigo-500' />
            </div>
            <h2 className='text-2xl mt-10 text-indigo-500 font-semibold'>Friendly Enviorment</h2>
            <p className='py-3 text-lg'>
              Sed ut perspiciatis unde omnis natus errr voluptatem accusantium doloremue laudant totam
            </p>
            <NavLink to='/' className='flex items-center justify-center capitalize font-semibold'>
              read more <BsArrowRight className='ml-2' />
            </NavLink>
          </div>
          <div className='box px-8 py-12 rounded-2xl bg-indigo-50 border border-indigo-200 hover:border-indigo-500 transition-all ease-in-out  '>
            <div className='flex items-center justify-center w-40 h-40 m-auto bg-white shadow-shadow1 rounded-full'>
              <SiAlwaysdata size={80} className='text-indigo-500' />
            </div>
            <h2 className='text-2xl mt-10 text-indigo-500 font-semibold'>Easy & Fast Process</h2>
            <p className='py-3 text-lg'>
              Sed ut perspiciatis unde omnis natus errr voluptatem accusantium doloremue laudant totam
            </p>
            <NavLink to='/' className='flex items-center justify-center capitalize font-semibold'>
              read more <BsArrowRight className='ml-2' />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
