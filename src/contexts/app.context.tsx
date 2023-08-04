import { User } from '@/types/user.type'
import { getAccessToken, getUser } from '@/utils/token'
import { SetStateAction, createContext, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  user: getUser(),
  setUser: () => null,
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>{children}</AppContext.Provider>
  )
}
