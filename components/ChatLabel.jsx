import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image' 

export default function ChatLabel({openMenu, setOpenMenu}) {
  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>
      <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
        <Image src={assets.three_dots} alt="three_dots" className={`w-4 ${openMenu.open ? 'block' : 'hidden'} group-hover:block`}></Image>
        <div className={`absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 ${openMenu.open ? '' : 'hidden'}`}>
            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                <Image src={assets.pencil_icon} alt="pencil_icon" className="w-4"></Image>
                <p>Rename</p>
            </div>


            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                <Image src={assets.delete_icon} alt="delete_icon" className="w-4"></Image>
                <p>Delete</p>
            </div>
        </div>
      </div>
    </div>
  )
}
