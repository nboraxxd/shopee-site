import { SetStateAction, createContext, useState } from 'react'
import { ExtendedPurchaseI } from '@/types/purchase.type'
import { User } from '@/types/user.type'
import { getAccessToken, getUser } from '@/utils/token'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchaseI[]
  setExtendedPurchases: React.Dispatch<SetStateAction<ExtendedPurchaseI[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  user: getUser(),
  setUser: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchaseI[]>(initialAppContext.extendedPurchases)

  function reset() {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setUser(null)
  }

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, extendedPurchases, setExtendedPurchases, reset }}
    >
      {children}
    </AppContext.Provider>
  )
}
