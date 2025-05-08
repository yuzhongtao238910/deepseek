import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
export default function PromptBox({
    setIsLoading, isLoading
}) {



    const [prompt, setPrompt] = useState('')

    const { user, chats, setChats, selectedChat, setSelectedChat } = useAppContext()


    const sendPrompt = async (e) => {
        const promptCopy = prompt

        console.log(chats, selectedChat)

        

        try {
            e.preventDefault()

            if (!user) {
                return toast.error("Please login to continue")
            }
            
            if (isLoading) {
                return toast.error("Please wait for the previous request to complete")
            }

            setIsLoading(true)

            setPrompt('')

            const userPrompt = {
                role: "user",
                content: promptCopy,
                timestamp: Date.now()
            }

            setChats((prevChats) => prevChats.map((chat) => {
                if (chat._id === selectedChat._id) {
                    return {
                        ...chat,
                        message: [...chat.message, userPrompt]
                    }
                }
                return chat
            }))

            setSelectedChat((prev) => {

                
                return {
                    ...prev,
                    message: [...prev.message, userPrompt]
                }
            })

            const { data } = await axios.post("/api/chat/ai", {
                chatId: selectedChat._id,
                prompt
            })

            console.log(data)
            // debugger

            if (data.success) {
                setChats((prevChats) => prevChats.map((chat) => {


                    if (chat._id === selectedChat._id) {
                        return {
                            ...chat,
                            message: [...chat.message, data.data]
                        }
                    }
                    return chat
                }))


                const message = data.data.content


                const messageTokens = message.split(" ")

                let assistantMessage = {
                    role: "assistant",
                    content: '',
                    timestamp: Date.now()
                }

                setSelectedChat((prev) => ({
                    ...prev,
                    message: [...prev.message, assistantMessage]
                }))

                for (let i = 0; i < messageTokens.length; i++) {
                    setTimeout(() => {
                        assistantMessage.content += messageTokens.slice(0, i + 1).join(" ")
                        setSelectedChat((prev) => {
                            const updatedMessages = [
                                ...prev.message.slice(0, -1),
                                assistantMessage
                            ]

                            return {
                                ...prev,
                                message: updatedMessages
                            }
                        })
                    }, i * 100)
                }

                setIsLoading(false)
            } else {
                toast.error(data.message)
                setPrompt(promptCopy)
            }
        } catch(error) {
            toast.error(error.message)
            setPrompt(promptCopy)
        } finally {
            setIsLoading(false)
        }
    }


    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendPrompt(e)
        }
    }

    return (
        <form className={`w-full ${selectedChat?.messages?.length > 0 ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
            onSubmit={sendPrompt}
        >
            <textarea
                className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
                rows={2}
                onKeyDown={handleKeyDown}
                placeholder="Message DeepSeek" required
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
            >
            </textarea>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
                        <Image src={assets.deepthink_icon} alt="deepthink_icon" className="h-5"></Image>
                        DeepThink (R1)
                    </p>

                    <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
                        <Image src={assets.search_icon} alt="search_icon" className="h-5"></Image>
                        Search
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Image src={assets.search_icon} alt="search_icon" className="hw-4 cursor-poninter"></Image>
                    <button className={`${prompt ? "bg-primary" : 'bg-[#71717a]'} rounded-full p-2 cursor-pointer`}>
                        <Image src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt="search" className="w-3.5 aspect-square"></Image>
                    </button>
                </div>
            </div>
        </form>
    )
}
