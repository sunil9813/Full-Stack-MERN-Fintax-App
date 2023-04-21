import React, { useState } from "react"
import { contact, icons } from "../../components/assets/data/dummydata"
import { ButtonRound } from "../../components/common/ui/Button"
import { TitleMd, TitleSm, TitleXl } from "../../components/common/ui/Title"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  createInquiry,
  selectIsLoading,
} from "../../redux/fetaures/InquirySlice"
import { Loader } from "../../components/common/Loader"
import { toast } from "react-toastify"

const initialState = {
  fullname: "",
  phoneNo: "",
  emailAddress: "",
  description: "",
}

export const Contact = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { fullname, phoneNo, emailAddress, description } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendInquiry = async (e) => {
    e.preventDefault()

    if (!fullname || !phoneNo || !emailAddress || !description) {
      return toast.error("All Fileds are required")
    }

    const userData = {
      fullname,
      phoneNo,
      emailAddress,
      description,
    }
    setIsLoading(true)
    try {
      await createInquiry(userData)
      navigate("/dashboard")
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }
  return (
    <>
      <section className='team relative'>
        <TitleXl title='Contact' />
        <div className='containers py-16'>
          <div className='grid grid-cols-3 gap-8 mt-10 text-center md:grid-cols-2 mobile:grid-cols-1'>
            {contact.map((items, index) => (
              <div
                key={index}
                className='team-card relative shadow-shadow1 rounded-3xl py-8'
              >
                <div className='w-32 h-32 bg-indigo-50 rounded-full mx-auto flex justify-center items-center'>
                  <img
                    src={items.cover}
                    alt={items.title}
                    className=' object-contain w-14'
                  />
                </div>
                <div className='p-8'>
                  <h4 className='text-2xl mb-5 font-meidum'>{items.title}</h4>
                  <p className='text-para'>{items.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01116148467422!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127ce078f%3A0x18e1c3ce7becf1b!2sApple%20Park!5e0!3m2!1sen!2sin!4v1637309850935!5m2!1sen!2sin'
          width='100%'
          title='contact'
          height='350'
          style={{ border: "0" }}
          loading='lazy'
        ></iframe>
        <div className=' bg-indigo-50 py-16'>
          <div className='containers flex justify-between md:flex-col'>
            <div className='left w-1/3 md:w-full'>
              <TitleSm title='Get In Touch' />
              <br />
              <TitleMd title='Need Any Help? Or Looking For an Agent' /> <br />
              <p>
                On the other hand denounce righteousy indignation and dislike
                men
              </p>
              <div className='flex'>
                {icons.map((item, idx) => (
                  <div key={idx} className='mr-3 my-5'>
                    <ButtonRound icon={item.icon} color='secondary' />
                  </div>
                ))}
              </div>
            </div>
            <div className='right w-2/3 ml-16 md:w-full md:ml-0'>
              {isLoading && <Loader />}
              <form onSubmit={sendInquiry}>
                <div className='grid grid-cols-2 gap-5 mobile:grid-cols-1'>
                  <input
                    type='text'
                    name='fullname'
                    value={fullname}
                    onChange={handleInputChange}
                    placeholder='Full Name'
                    className='w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                  <input
                    type='text'
                    name='phoneNo'
                    value={phoneNo}
                    onChange={handleInputChange}
                    placeholder='Phone'
                    className='w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <input
                  type='email'
                  name='emailAddress'
                  value={emailAddress}
                  onChange={handleInputChange}
                  placeholder='Email'
                  className='my-8 w-full p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                  required
                />
                <textarea
                  name='description'
                  cols='30'
                  rows='10'
                  value={description}
                  onChange={handleInputChange}
                  className='w-full outline-none p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                  required
                ></textarea>
                <button
                  type='submit'
                  className='capitalize bg-indigo-500 px-12 mt-3 py-3.5 text-white rounded-xl flex justify-center items-center'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
