import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
      <div className='w-full px-14 py-5 flex items-center justify-center shadow-xl gap-8 text-base font-semibold text-[#666666]'>
          <Link href="/creator/dashboard">Go to Creator Dashboard</Link>
          <Link href="/editor/dashboard">Go to Editor Dashboard</Link>
    </div>
  )
}

export default Navigation