import React from "react"
import { Sidebar } from "./Sidebar"
import { Container } from "../components/common/ui/Design"

export const AdminLayout = ({ children }) => {
  return (
    <Container>
      <div className='flex justify-between'>
        <Sidebar />
        <main className='w-3/4 p-8'>{children}</main>
      </div>
    </Container>
  )
}
