import React, { useState } from "react"
import { GiMuscleUp } from "react-icons/gi"

import { ACTIONS, useAppContext } from "../../components/App/Context"

import "./Onboard.css"

function Onboard() {
  const [target, setTarget] = useState("")
  const { dispatch } = useAppContext()

  function handleSetTarget() {
    dispatch({ type: ACTIONS.SET_TARGET, payload: target })
  }

  return (
    <>
      <h1>
        Welcome to <i className="Onboard-logo">FUEL</i>
      </h1>
      <p>
        Let&apos;s be real, the only macro ever worth tracking is <strong>PROTEIN</strong>. This
        dead simple intake calculator is all you need to hit those goals and make them gains.
      </p>
      <p>
        Enter your intake goal{" "}
        <input
          type="number"
          value={target}
          onChange={e => setTarget(e.target.value)}
          placeholder="in grams"
        />
      </p>

      <p>
        <small>A good guide, 2x your body weight (in kg). </small>
      </p>

      {target && (
        <button className="Onboard-next" type="button" onClick={handleSetTarget}>
          Get started <GiMuscleUp className="Onboard-next-ico" />
        </button>
      )}
    </>
  )
}

export default Onboard
