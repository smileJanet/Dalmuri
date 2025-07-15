import { createContext, useContext, useState } from 'react'

type ChatRoomContextType = {
  isChatRoomOpen: boolean
  setChatRoomOpen: (value: boolean) => void
}

const NoTopbarFooterContext = createContext<ChatRoomContextType | undefined>(undefined)

export const NoTopbarFooterProvider = ({children} : {children: React.ReactNode}) => {
  const [isChatRoomOpen, setChatRoomOpen] = useState(false)

  return (
    <NoTopbarFooterContext.Provider value ={{ isChatRoomOpen, setChatRoomOpen }}>
      {children}
    </NoTopbarFooterContext.Provider>
  )
}

export const useNoTopbarFooter = () => {
  const context = useContext(NoTopbarFooterContext)
  if(!context) throw new Error('useNoTopbarFooter must be used within a NoTopbarFooterProvider')
  return context
}