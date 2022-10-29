import React, { useState, useEffect, useRef } from "react"
import { IoMdAdd } from "react-icons/io"
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs"
import { FaSave } from "react-icons/fa"

import { ACTIONS, useAppContext } from "../../components/App/Context"
import HistoricGraph from "./HistoricGraph/HistoricGraph"
import getStartOfDate from "./getStartOfDate"

import "./Tracker.css"

function useTodaysLog() {
  const id = getStartOfDate()
  const {
    dispatch,
    state: { logs },
  } = useAppContext()

  useEffect(() => {
    if (!(id in logs)) dispatch({ type: ACTIONS.ADD_EMPTY_LOG, payload: id })
  }, [dispatch, id, logs])

  return { id, value: logs[id] || 0 }
}

function Tracker() {
  const [showEditTarget, setShowEditTarget] = useState(false)
  const [newTarget, setNewTarget] = useState("")
  const {
    dispatch,
    state: { target, logs },
  } = useAppContext()

  const today = useTodaysLog()
  const percent = Math.round((today.value / target) * 100)
  const newTargetInputRef = useRef()

  function handleUpdateTrackerClick(value) {
    dispatch({ type: ACTIONS.ADD_PROTEIN, payload: { id: today.id, value } })
  }

  function handleClearTrackerClick() {
    dispatch({ type: ACTIONS.CLEAR_PROTEIN, payload: today.id })
  }

  function handleOnEditGoalClick() {
    setShowEditTarget(true)
  }

  function handleUpdateTargetClick() {
    if (newTarget) {
      dispatch({ type: ACTIONS.SET_TARGET, payload: newTarget })
      setShowEditTarget(false)
      setNewTarget("")
    }
  }

  useEffect(() => {
    if (newTargetInputRef.current) newTargetInputRef.current.focus()
  }, [showEditTarget])

  return (
    <div className="Tracker">
      <div className="Tracker-container">
        <div className="Tracker-fuel-bar">
          <div className="Tracker-fuel-bar-inner" style={{ height: `${percent}%` }}>
            <span className="Tracker-fuel-bar-percent">{percent}%</span>
          </div>
        </div>
        <div className="Tracker-detail">
          <h1>
            {today.value}g of {target}g
          </h1>

          <div className="Tracker-buttons">
            <button type="button" onClick={() => handleUpdateTrackerClick(5)}>
              <IoMdAdd /> 5g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(10)}>
              <IoMdAdd /> 10g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(15)}>
              <IoMdAdd /> 15g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(20)}>
              <IoMdAdd /> 20g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(25)}>
              <IoMdAdd /> 25g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(30)}>
              <IoMdAdd /> 30g
            </button>
            <button type="button" onClick={() => handleUpdateTrackerClick(50)}>
              <IoMdAdd /> 50g
            </button>
            <button className="Tracker-clear-btn" onClick={handleClearTrackerClick} type="button">
              Clear <BsFillTrashFill />
            </button>
            {showEditTarget ? (
              <div className="Tracker-edit-form">
                <input
                  type="number"
                  ref={newTargetInputRef}
                  value={newTarget}
                  onChange={e => setNewTarget(e.target.value)}
                  placeholder="enter grams"
                />
                <button type="button" onClick={handleUpdateTargetClick}>
                  <FaSave />
                </button>
              </div>
            ) : (
              <button className="Tracker-edit-btn" onClick={handleOnEditGoalClick} type="button">
                Edit goal <BsPencilSquare />
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <HistoricGraph logs={logs} target={target} />
      </div>
    </div>
  )
}

export default Tracker
