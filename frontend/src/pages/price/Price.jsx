import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsArrowUpRight, BsCheckCircleFill } from "react-icons/bs"
import { price } from "../../components/assets/data/dummydata"
import { ButtonPrimary } from "../../components/common/ui/Button"
import { TitleMd, TitleSm, TitleXl } from "../../components/common/ui/Title"
import { Faq } from "../../routers"

export const Price = () => {
  return (
    <>
      <section className='price'>
        <TitleXl title='Price' />
        <div className='bg-indigo-50'>
          <div className='containers py-16 text-center'>
            <TitleSm title='Pricing Package' /> <br />
            <TitleMd title='Popular Pricing Plan For' /> <br />
            <div className='grid grid-cols-3 gap-8 mt-10 md:grid-cols-2 mobile:grid-cols-1'>
              {price.map((item) => (
                <div className='box shadow-shadow1 p-9 rounded-lg bg-white' key={item.id}>
                  <h3 className='text-xl font-semibold text-center'>{item.name}</h3>
                  <h3 className='text-5xl font-semibold text-center text-secondary py-8'>
                    <span className='text-xl'>$</span>
                    {item.price}
                    <span className='text-xl text-para font-normal'>/Monthly</span>
                  </h3>
                  <hr />
                  <ul className='py-5'>
                    {item.list.map((t, i) => (
                      <li key={i} className='text-lg font-medium mb-5 flex items-center'>
                        {t.plan === true ? <BsCheckCircleFill className='text-indigo-500' /> : <AiOutlineClose className='text-red-500' />}
                        <span className='ml-3'> {t.text}</span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className='flex items-center justify-center pt-8'>
                    <ButtonPrimary text='Select plan' icon={<BsArrowUpRight />} color='bg-indigo-500' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='py-16'>
          <div className='w-1/2 mx-auto md:w-full md:px-16 mobile:px-5'>
            <div className='text-center'>
              <TitleSm title='Amazing Company' /> <br />
              <TitleMd title='Great Insurance your Solutions' /> <br />
            </div>
            <Faq />
          </div>
        </div>
      </section>
    </>
  )
}
