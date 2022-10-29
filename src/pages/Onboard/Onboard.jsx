import React, { useState, useEffect } from "react"
import { GiMuscleUp } from "react-icons/gi"
import { GrInstall } from "react-icons/gr"
import { FiShare } from "react-icons/fi"

import { ACTIONS, useAppContext } from "../../components/App/Context"

import "./Onboard.css"

function Onboard() {
  const [target, setTarget] = useState("")
  const [installEvent, setInstallEvent] = useState()
  const [showIOSMessage, setShowIOSMessage] = useState()
  const { dispatch } = useAppContext()

  function handleSetTarget() {
    dispatch({ type: ACTIONS.SET_TARGET, payload: target })
  }

  function install() {
    if (installEvent) return installEvent.prompt()
    return setShowIOSMessage(true)
  }

  useEffect(() => {
    function eventHandler(event) {
      setInstallEvent(event)
    }

    window.addEventListener("beforeinstallprompt", eventHandler)

    return () => {
      window.removeEventListener("beforeinstallprompt", eventHandler)
    }
  }, [setInstallEvent])

  return (
    <>
      <h1>
        Welcome to <i className="Onboard-logo">FUEL</i>
      </h1>
      <p>
        Let&apos;s be real, the only macro worth anything is <strong>PROTEIN</strong>. This dead
        simple intake tracker is all you need to hit those goals and make dem gainz.
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
        <button type="button" onClick={handleSetTarget}>
          Get started <GiMuscleUp className="Onboard-next-ico" />
        </button>
      )}

      <div className="Onboard-install">
        {showIOSMessage ? (
          <small className="Onboard-ios-message">
            To install on iOS click <FiShare /> and&nbsp;<strong>Add To Home Screen</strong>
          </small>
        ) : (
          <button className="Onboard-install-btn" type="button" onClick={install}>
            <GrInstall className="Onboard-install-ico" /> Tap to install
          </button>
        )}
      </div>
    </>
  )
}

export default Onboard
