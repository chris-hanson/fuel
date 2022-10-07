import React from "react"

import { useAppContext } from "./Context"
import Onboard from "../../pages/Onboard/Onboard"

import "./App.css"

function App() {
  const {
    state: { target },
  } = useAppContext()

  return <main className="App">{!target && <Onboard />}</main>
}

export default App
