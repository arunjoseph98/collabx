import React, { createContext, useState } from 'react'

export const chatContext = createContext()

const ChatContextAPI = ({children}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    
  return (
    <chatContext.Provider value={{selectedUser, setSelectedUser}}>{children}</chatContext.Provider>
  )
}

export default ChatContextAPI