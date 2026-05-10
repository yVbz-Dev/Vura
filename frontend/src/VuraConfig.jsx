import { createContext, useContext, useState } from "react";

export const VuraConfigContext = createContext()

export default function VuraConfigProvider({ children }) {
  const [Config, setConfig] = useState({
    VimMode: true
  })

  const UpdateConfig = (key, value) => {
    const newConfig = {
      ...Config,
      [key]: value,
    }
    setConfig(newConfig)
  }

  return (
    <VuraConfigContext.Provider value={{ Config, UpdateConfig }}>
      {children}
    </VuraConfigContext.Provider>
  )
}
