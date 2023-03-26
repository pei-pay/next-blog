import React, { FC, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 max-w-4xl w-full mx-auto'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
