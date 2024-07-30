import Sidebar from '@/app/components/Sidebar'
import React from 'react'

export default function Recipe() {
  return (
    <div className='grid grid-cols-12'>
      <Sidebar/>
        <div className="bg-gray-200 p-6 col-span-9">
          <div className="font-bold text-3xl">Recipe</div>
        </div>
    </div>
  )
}
