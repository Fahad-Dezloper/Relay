import Link from 'next/link'
import React from 'react'
import UserProfile from './components/UserProfile'

const page = () => {
  return (
    <div className="flex flex-col gap-6 bg-[#130e0e] w-full h-screen justify-center items-center">
      <div className='absolute top-0 w-full bg-gray-700 text-black'>
        <UserProfile />
      </div>
      <div className='text-4xl font-semibold text-white'>Relay</div>
      <div className='flex gap-4'>
        <Link href="/select-role" className='p-4 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500'>Sign up</Link>
        <Link href="/login" className='p-4 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500'>Login</Link>
      </div>
    </div>
  )
}

export default page