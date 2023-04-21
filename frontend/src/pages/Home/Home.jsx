import React from "react"
import { Hero } from "../../components/hero/Hero"
import { ServicesCard } from "../services/Services"
import { AboutCard } from "../about/About"
import { BlogCard } from "../blog/Blog"

export const Home = () => {
  return (
    <>
      <Hero />
      <ServicesCard />
      <AboutCard />
      <div className='text-center'>
        <h3 className='text-indigo-500 text-xl'>Latest News & Blog</h3>
        <h1 className='text-4xl font-semibold relative'>Read Our Latest Articles </h1>
      </div>
      <BlogCard />
    </>
  )
}
