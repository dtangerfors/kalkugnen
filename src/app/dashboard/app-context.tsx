"use client"

import { createContext, useContext, useState } from "react"

type AppContextProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default function AppProvider({children}: {children: React.ReactNode}) {
  const currentDate = new Date().toLocaleDateString();
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);

  return (
    <AppContext.Provider value={{selectedDate, setSelectedDate}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}