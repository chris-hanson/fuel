import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react"

const DEFAULT_STATE = {
  target: 0,
  logs: {},
}

const ACTIONS = {
  SET_TARGET: "SET_TARGET",
  ADD_EMPTY_LOG: "ADD_EMPTY_LOG",
  ADD_PROTEIN: "ADD_PROTEIN",
  CLEAR_PROTEIN: "CLEAR_PROTEIN",
}

function appReducer(state, { type, payload }) {
  if (type === ACTIONS.SET_TARGET) {
    return {
      ...state,
      target: payload,
    }
  }

  if (type === ACTIONS.ADD_EMPTY_LOG) {
    return {
      ...state,
      logs: {
        ...state.logs,
        [payload]: 0,
      },
    }
  }

  if (type === ACTIONS.ADD_PROTEIN) {
    const logs = { ...state.logs }
    logs[payload.id] = Number(logs[payload.id]) + payload.value
    return { ...state, logs }
  }

  if (type === ACTIONS.CLEAR_PROTEIN) {
    const logs = { ...state.logs }
    logs[payload] = 0
    return { ...state, logs }
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
