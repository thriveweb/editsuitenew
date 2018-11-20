import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

import './Arrow.css'

export default () => (
  <ReactFullpage
    render={({ fullpageApi }) => {
      return (
        <div onClick={() => fullpageApi.moveSectionUp()} className="arrow-up">
          {''}
        </div>
      )
    }}
  />
)
