"use client"

import { useUser, useAuth } from "@clerk/nextjs"
import axios from "axios"
import { createContext, useContext } from "react"

export const AppContext = createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({children}) => {
    const { user } = useUser()

    const { getToken } = useAuth()

    const [chats, setChats] = useState([])

    const [selectedChat, setSelectedChat] = useState(null)

    const createNewChat = async () => {
        try {
            if (!user) {
                return null
            }

            const token = await getToken()

            await axios.post("/api/chat/create", {
                // userId: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch(error) {

        }
    }

    const fetchUserChats = async () => {
        try {
            
        } catch(error) {
            
        }
    }

    const value = {
        user
    }
    return (
        <AppContext.Provider value={value}>
            {
                children
            }
        </AppContext.Provider>
    )
}