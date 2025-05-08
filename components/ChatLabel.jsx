import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image' 
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ChatLabel({openMenu, setOpenMenu, id, name}) {

  const {
    fetchUserChats,
    chats,
    setSelectedChat
  } = useAppContext()


  const selectChat = () => {
    const chatData = chats.find(chat => chat._id === id)
    setSelectedChat(chatData)
    console.log(chatData)
  }

  const renameHandler = async () => {
    try {

      const newName = prompt("Enter new name")
      if (!newName) {
        return
      }

      const { data } = await axios.post("/api/chat/rename", {
        chatId: id,
        name: newName
      })

      if (data.success) {
        fetchUserChats()

        setOpenMenu({
          id: 0,
          open: false
        })
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  const deleteHandler = async () => {
    try {

      const confirm = window.confirm("Are ytou sure you want to delete this chat?")
      
      if (!confirm) return
      const { data } = await axios.post("/api/chat/delete", {
        chatId: id
      })

      if (data.success) {
        fetchUserChats()
        setOpenMenu({
          id: 0,
          open: false
        })
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }


  return (
    <div onClick={selectChat} className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      

      <p className="group-hover:max-w-5/6 truncate">{name}</p>
      <div onClick={e => {

        e.stopPropagation()

        setOpenMenu({
          id: id,
          open: !openMenu.open
        })

      }}  className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
        <Image src={assets.three_dots} alt="three_dots" className={`w-4 ${openMenu.id === id && openMenu.open ? 'block' : 'hidden'} group-hover:block`}></Image>
        <div className={`absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 ${ openMenu.id === id && openMenu.open ? '' : 'hidden'}`}>
            <div 
              onClick={renameHandler}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                <Image src={assets.pencil_icon} alt="pencil_icon" className="w-4"></Image>
                <p>Rename</p>
            </div>


            <div onClick={deleteHandler} className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                <Image src={assets.delete_icon} alt="delete_icon" className="w-4"></Image>
                <p>Delete</p>
            </div>
        </div>
      </div>
    </div>
  )
}
