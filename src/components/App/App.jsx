import React from "react"

import { GiMuscleUp } from "react-icons/gi"

import "./App.css"

function App() {
  return (
    <main className="App">
      <h1>
        Welcome to <i className="App-logo">FUEL</i>
      </h1>
      <p>
        Let&apos;s be real, the only macro ever worth tracking is <strong>PROTEIN</strong>. This
        dead simple intake calculator is all you need to hit those goals and make them gains.
      </p>
      <p>
        Enter your intake goal <input type="number" placeholder="in grams" />
      </p>
      <p>A good guide, 2x your body weight (in kg)</p>

      <button className="App-next" type="button">
        Get started <GiMuscleUp className="App-next-ico" />
      </button>
    </main>
  )
}

export default App
