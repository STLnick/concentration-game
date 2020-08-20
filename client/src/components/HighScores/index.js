import React, { Fragment, useState } from 'react'

import './HighScores.css'

export const HighScores = () => {
  const [scores, setScores] = useState([
    { initials: 'NR', time: '0:40' },
    { initials: 'AK', time: '0:30' },
    { initials: 'MM', time: '0:35' },
  ])

  const renderTableRows = () => {
    return scores.map(({ initials, time }) => {
      return (
        <tr>
          <td>{initials}</td>
          <td>{time}</td>
        </tr>
      )
    })
  }

  return (
    <Fragment>
      <table>
        <caption>High Scores</caption>
        <thead>
          <tr>
            <th>Initials</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </Fragment>
  )
}
