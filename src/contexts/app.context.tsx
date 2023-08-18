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
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  user: getUser(),
  setUser: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [user, setUser] = useState<User | null>(initialAppContext.user)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchaseI[]>(initialAppContext.extendedPurchases)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, extendedPurchases, setExtendedPurchases }}
    >
      {children}
    </AppContext.Provider>
  )
}
