import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useState } from 'react'

export default function PromptBox({
    setIsLoading, isLoading
}) {

    const [prompt, setPrompt] = useState('')


    return (
        <form className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
            <textarea
                className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
                rows={2}
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
