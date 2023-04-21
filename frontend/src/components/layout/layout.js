import React from "react"
import { Header, Footer } from "../../routers/index"

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}
