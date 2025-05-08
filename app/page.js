"use client"
import { assets } from "@/assets/assets"
import { useState } from "react"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import PromptBox from "@/components/PromptBox"
import Message from "@/components/Message"
import { useAppContext } from "@/context/AppContext"
import { useEffect, useRef } from "react"

export default function Home() {

  const [expand, setExpand] = useState(false)

  const [messages, setMessages] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const {selectedChat, setSelectedChat} = useAppContext()


  const containerRef = useRef(null)



  useEffect(() => {
    if (selectedChat) {

      console.log(selectedChat, 2999)
      setMessages(selectedChat.message)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])



  return (
    <div>
      <div className="flex h-screen">
        {/* slidbar */}
        <Sidebar expand={expand} setExpand={setExpand}></Sidebar>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={() => (expand ? setExpand(false) : setExpand(true))} className="rotate-180" src={assets.menu_icon} alt="menu_icon" />
            <Image className="opacity-70" src={assets.chat_icon} alt="chat_icon" />
          </div>

          {
            messages?.length === 0 ? (
              <>
                <div className="flex items-center gap-3">
                  <Image src={assets.logo_icon} alt="logo_icon" className="h-16"></Image>
                  <p className="text-2xl font-medium">Hi, I&lsquo;m DeepSeek</p>
                </div>
                <p className="text-sm mt-2"> How can I help you today?</p>
              </>
            ) : (<div ref={containerRef}
              className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
            >
              <p className="fixed top-8 border border-transparent hover:border-gary-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
                {
                  selectedChat.name
                }
              </p>
              {
                messages?.map((message, index) => {
                  return <Message key={index} role={message.role} content={message.content}></Message>
                })
              }
              {
                isLoading && (
                  <div className="flex gap-4 max-w-3xl w-full py-3">
                    <Image className="h-9 w-9 p-1 border border-white/15 rounded-full" src={assets.logo_icon} alt="logo_icon"></Image>
                    <div className="loader flex justify-center items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                      <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    </div>
                  </div>
                )
              }
              
            </div>)
          }
          {/* prompt box */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}></PromptBox>
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>
        </div>
      </div>
    </div>
  );
}
