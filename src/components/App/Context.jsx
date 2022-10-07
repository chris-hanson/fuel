import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react"

const DEFAULT_STATE = {
  target: 0,
  logs: [],
}

const ACTIONS = {
  SET_TARGET: "SET_TARGET",
}

function appReducer(state, { type, payload }) {
  if (type === ACTIONS.SET_TARGET) {
    return {
      ...state,
      target: payload,
    }
  }

  return state
}

const AppContext = createContext()

function loadState() {
  try {
    const state = localStorage.getItem("STATE")
    return state ? JSON.parse(state) : DEFAULT_STATE
  } catch (e) {
    return DEFAULT_STATE
  }
}

export { ACTIONS }

export function useAppContext() {
  return useContext(AppContext)
}

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, loadState())
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

  useEffect(() => localStorage.setItem("STATE", JSON.stringify(state)), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
