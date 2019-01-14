import React, { Component } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

export default class FullPage extends Component {
  render() {
    const options = {
        licenseKey: 'DF3DC63D-DE084677-83C094FD-797D4531'
      },
      { children } = this.props
    return (
      <ReactFullpage
        {...options}
        render={() => {
          return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>
        }}
      />
    )
  }
}

export const ArrowUp = () => (
  <div
    className="arrow-up"
    onClick={() => window.fullpage_api.moveSectionUp()}
  />
)

export const ArrowDown = () => (
  <div
    className="arrow-down"
    onClick={() => window.fullpage_api.moveSectionDown()}
  />
)
