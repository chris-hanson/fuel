import React from "react"

import getStartOfDate from "../getStartOfDate"

import "./HistoricGraph.css"

function calcWidth(target, value) {
  const percent = (value / target) * 100
  if (percent > 100) return "100%"
  return `${percent}%`
}

function HistoricGraph({ logs, period = 7, target }) {
  const today = getStartOfDate()
  const todayValue = logs[today] || 0
  let noRecentData = !todayValue
  let highestValue = todayValue

  const ids = Array(period - 1)
    .fill(0)
    .reduce(
      (accumulator, defaultVal) => {
        const [prev] = accumulator[accumulator.length - 1]
        const key = getStartOfDate(+new Date(prev) - 1)
        const value = Number(logs[key] || defaultVal)
        if (value) noRecentData = false
        if (value > highestValue) highestValue = value
        return [...accumulator, [key, value]]
      },
      [[today, todayValue]]
    )

  let targetLeft = "100%"
  if (highestValue > target) {
    targetLeft = calcWidth(highestValue, target)
  }

  return (
    <div className="HistoricGraph-container">
      <h2>Last 7 days</h2>

      {noRecentData ? (
        <p>No recent data </p>
      ) : (
        <div className="HistoricGraph-chart">
          <div className="HistoricGraph-target" style={{ left: targetLeft }}>
            {target}
          </div>

          {ids.map(([key, value]) => (
            <div className="HistoricGraph-bar-container" key={key}>
              {new Date(key).toLocaleDateString()} - <strong>{value}g</strong>
              <div
                className="HistoricGraph-bar"
                style={{ width: calcWidth(highestValue > target ? highestValue : target, value) }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoricGraph
