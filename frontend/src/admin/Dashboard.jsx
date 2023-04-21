import React, { useEffect } from "react"
import { Card, Grid, Heading } from "../components/common/ui/Design"
import { TitleMd } from "../components/common/ui/Title"
import { useDispatch, useSelector } from "react-redux"
import { selectName } from "../redux/fetaures/auth/authSlice"
import useRedirectLoggedOutUser from "../components/customeHook/useRedirectLoggedOutUser"
import { getAllBlogs } from "../redux/fetaures/BlogSlice"
import { getAllTeams } from "../redux/fetaures/TeamSlice"
import { getAllServices } from "../redux/fetaures/ServiceSlice"
import { getAllFaqs } from "../redux/fetaures/FaqSlice"
import { getAllCareers } from "../redux/fetaures/CareerSlice"
import { getAllInquiry } from "../redux/fetaures/InquirySlice"

export const Dashboard = () => {
  useRedirectLoggedOutUser("/login")
  const name = useSelector(selectName)
  const dispatch = useDispatch()

  const { blogs } = useSelector((state) => state.blog)
  const { teams } = useSelector((state) => state.team)
  const { services } = useSelector((state) => state.service)
  const { careers } = useSelector((state) => state.career)
  const { faqs } = useSelector((state) => state.faq)
  const { inquirys } = useSelector((state) => state.inquiry)
  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllTeams())
    dispatch(getAllServices())
    dispatch(getAllFaqs())
    dispatch(getAllCareers())
    dispatch(getAllInquiry())
  }, [dispatch])
  return (
    <>
      <section className='dashboard'>
        <Card>
          <div className='flex items-center text-center justify-center'>
            <h1 className='text-3xl font-medium capitalize'>
              Welcome
              <span className=' text-indigo-500'> {name} ✋</span>
            </h1>
          </div>
        </Card>
        <br />
        <Grid col={3} gap={8}>
          <Card>
            <div className='text-center'>
              <Heading>Total Blog Post</Heading>
              <TitleMd title={blogs?.length} />
            </div>
          </Card>
          <Card>
            <div className='text-center'>
              <Heading>Total Teams</Heading>
              <TitleMd title={teams?.length} />
            </div>
          </Card>
          <Card>
            <div className='text-center'>
              <Heading>Total Services Post</Heading>
              <TitleMd title={services?.length} />
            </div>
          </Card>
          <Card>
            <div className='text-center'>
              <Heading>Total Job Post</Heading>
              <TitleMd title={careers?.length} />
            </div>
          </Card>
          <Card>
            <div className='text-center'>
              <Heading>Total Inquiry</Heading>
              <TitleMd title={inquirys?.length} />
            </div>
          </Card>
          <Card>
            <div className='text-center'>
              <Heading>Total Faq</Heading>
              <TitleMd title={faqs?.length} />
            </div>
          </Card>
        </Grid>
      </section>
    </>
  )
}
