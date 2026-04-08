import { createContext, useContext, useState } from 'react'

const DifficultyContext = createContext()

export const MODES = { LEARN: 'learn', PRACTICE: 'practice', QUIZ: 'quiz' }

export function DifficultyProvider({ children }) {
  const [mode, setMode] = useState(MODES.LEARN)
  return (
    <DifficultyContext.Provider value={{ mode, setMode }}>
      {children}
    </DifficultyContext.Provider>
  )
}

export function useDifficulty() {
  return useContext(DifficultyContext)
}
