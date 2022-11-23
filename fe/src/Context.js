import { createContext, useContext} from 'react'

const mainContext = createContext()

export const Provider = ({children, value}) => 
<mainContext.Provider value={value}>{children}</mainContext.Provider>

export const useValue = () => useContext(mainContext)