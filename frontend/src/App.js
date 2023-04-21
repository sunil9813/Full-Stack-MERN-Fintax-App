import { BrowserRouter, Route, Routes } from "react-router-dom"
import { About, AddAbout, AddBlog, AddCareer, AddFaq, AddPrice, AddServices, AddTeam, AdminLayout, Blog, Career, Contact, Dashboard, Home, Layout, Login, Price, Register, Services, Team } from "./routers/index.js"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getLoginStatus } from "./redux/services/authServices.js"
import { SET_LOGIN } from "./redux/fetaures/auth/authSlice.js"
import BlogDetails from "./pages/blog/BlogDetails.js"
import { EditBlog } from "./admin/EditBlog.js"
import { EditService } from "./admin/EditService.jsx"
import { EditAbout } from "./admin/EditAbout.jsx"
import { Inquiry } from "./admin/Inquiry.jsx"
import { NotFound } from "./components/common/NotFound.jsx"

axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/services'
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          <Route
            path='/team'
            element={
              <Layout>
                <Team />
              </Layout>
            }
          />
          <Route
            path='/blog'
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path='/blog/:slug'
            element={
              <Layout>
                <BlogDetails />
              </Layout>
            }
          />

          <Route
            path='/contact'
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path='/price'
            element={
              <Layout>
                <Price />
              </Layout>
            }
          />
          <Route
            path='/about'
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path='/career'
            element={
              <Layout>
                <Career />
              </Layout>
            }
          />
          <Route
            path='/login'
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path='/register'
            element={
              <Layout>
                <AdminLayout>
                  <Register />
                </AdminLayout>
              </Layout>
            }
          />

          {/* Admin Router */}
          <Route
            path='/dashboard'
            element={
              <Layout>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-about'
            element={
              <Layout>
                <AdminLayout>
                  <AddAbout />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-service'
            element={
              <Layout>
                <AdminLayout>
                  <AddServices />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-blog'
            element={
              <Layout>
                <AdminLayout>
                  <AddBlog />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/edit-blog/:id'
            element={
              <Layout>
                <AdminLayout>
                  <EditBlog />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/edit-service/:id'
            element={
              <Layout>
                <AdminLayout>
                  <EditService />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/edit-about/:id'
            element={
              <Layout>
                <AdminLayout>
                  <EditAbout />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-team'
            element={
              <Layout>
                <AdminLayout>
                  <AddTeam />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-price'
            element={
              <Layout>
                <AdminLayout>
                  <AddPrice />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-career'
            element={
              <Layout>
                <AdminLayout>
                  <AddCareer />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/add-faq'
            element={
              <Layout>
                <AdminLayout>
                  <AddFaq />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='/inquiry-list'
            element={
              <Layout>
                <AdminLayout>
                  <Inquiry />
                </AdminLayout>
              </Layout>
            }
          />
          <Route
            path='*'
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
