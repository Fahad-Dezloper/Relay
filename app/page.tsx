import Link from 'next/link'
import React from 'react'
import Navigation from './(components)/Navigation'

const page = () => {
  return (
    <div className='w-full h-screen'>
      <Navigation />
      <div className='w-full h-full flex justify-center items-center'>
        <Link href="/">Login access left</Link>
      </div>
    </div>
  )
}

export default page