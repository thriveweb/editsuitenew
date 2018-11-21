import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

import './Arrow.css'

export default ({ up, down }) => {
  let options = {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
  }
  return (
    <ReactFullpage
      {...options}
      render={({ state, fullpageApi }) => {
        return (
          <div
            className={down ? 'arrow-down' : up ? 'arrow-up' : null}
            onClick={
              down
                ? () => fullpageApi.moveSectionDown()
                : up
                  ? () => fullpageApi.moveSectionUp()
                  : null
            }
          />
        )
      }}
    />
  )
}
