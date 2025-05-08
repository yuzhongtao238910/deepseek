import { assets } from '@/assets/assets'
import React, { useEffect } from 'react'
import Image from "next/image"

import Markdown from 'react-markdown'

import Prism from 'prismjs'
export default function Message({
    role, content
}) {

    useEffect(() => {
        if (content) {
            Prism.highlightAll()
        }
    }, [content])



    const copyMessage = () => {
        navigator.clipboard.writeText(content)
        toast.success("Copied to clipboard")
    }



    return (
        <div className="flex flex-col items-center w-full max-w-3xl text-sm">
            <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
                <div className={`group relative flex max-w-2xl py-3 rounded-xl ${role === 'user' ? 'bg-[#414158] px-5' : 'gap-3'}`}>
                    <div className={`opacity-0 group-hover:opacity-100 absolute ${
                        role === 'user' ? '-left-16 top-2.5' : 'left-9 -bottom-6'
                    } transition-all`}>
                        <div className="flex items-center gap-2 opacity-70">
                            {
                                role === 'user' ? (
                                    <>
                                        <Image onClick={copyMessage} src={assets.copy_icon} alt="copy_icon" className="w-4 cursor-pointer"></Image>
                                        <Image src={assets.pencil_icon} alt="pencil_icon" className="w-4.5 cursor-pointer"></Image>
                                    </>
                                ) : (
                                    <>
                                        <Image onClick={copyMessage} src={assets.copy_icon} alt="copy_icon" className="w-4.5 cursor-pointer"></Image>
                                        <Image src={assets.regenerate_icon} alt="regenerate_icon" className="w-4 cursor-pointer"></Image>
                                        <Image src={assets.like_icon} alt="like_icon" className="w-4 cursor-pointer"></Image>
                                        <Image src={assets.dislike_icon} alt="dislike_icon" className="w-4 cursor-pointer"></Image>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {
                        role === 'user' ? (
                            <span className="text-white/90">
                                {
                                    content
                                }
                            </span>
                        ) : (
                            <>
                                <Image src={assets.logo_icon} alt="logo_icon" className="h-9 w-9 p-1 border border-white/15 rounded-full"></Image>
                                <div className="space-y-4 w-full overflow-scroll">
                                    <Markdown>{content}</Markdown>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
