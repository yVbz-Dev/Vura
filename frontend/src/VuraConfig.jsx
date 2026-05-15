import { createContext, useContext, useEffect, useState } from "react";
import { GetConfig } from "../wailsjs/go/main/App"

export const VuraConfigContext = createContext()

export default function VuraConfigProvider({ children }) {
  const UserConfig = null
  useEffect(() => {
    GetConfig().then((config) => {
      setConfig(config)
    })
  }, [])

  const [Config, setConfig] = useState(UserConfig)

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
