// import React from 'react'

import Content from "./Content"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Content />
    </div>
  )
}

export default Layout