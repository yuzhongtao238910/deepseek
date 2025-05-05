"use client"
import { assets } from "@/assets/assets"
import { useState } from "react"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import PromptBox from "@/components/PromptBox"
import Message from "@/components/Message"


export default function Home() {

  const [expand, setExpand] = useState(false)

  const [messages, setMessages] = useState([])

  const [isLoading, setIsLoading] = useState(false)

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
            messages.length === 0 ? (
              <>
                <div className="flex items-center gap-3">
                  <Image src={assets.logo_icon} alt="logo_icon" className="h-16"></Image>
                  <p className="text-2xl font-medium">Hi, I&lsquo;m DeepSeek</p>
                </div>
                <p className="text-sm mt-2"> How can I help you today?</p>
              </>
            ) : (<div>
              <Message role='user' content="What is next js"></Message>
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
