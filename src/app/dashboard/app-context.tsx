"use client"

import { createContext, useContext, useState } from "react"

type AppContextProps = {
  selectedDate: string | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default function AppProvider({children}: {children: React.ReactNode}) {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <AppContext.Provider value={{selectedDate, setSelectedDate}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}