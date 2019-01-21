import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import './Opener.css'

class OpenerVideo extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = {
    videoLoaded: false,
    videoBuffer: 0,
    videoCurrentTime: 0
  }

  videoBufferBar(event) {
    if (event.target.readyState === 4) {
      let range = 0,
        bf = event.target.buffered,
        time = event.target.currentTime

      try {
        while (!(bf.start(range) <= time && time <= bf.end(range))) {
          range += 1
        }
        let loadStartPercentage = bf.start(range) / event.target.duration,
          loadEndPercentage = bf.end(range) / event.target.duration
        this.setState({
          videoBuffer: loadEndPercentage - loadStartPercentage
        })
        if (loadEndPercentage - loadStartPercentage === 1) {
          this.setState({ videoLoaded: true })
          ReactDOM.findDOMNode(this.ref.current).removeEventListener(
            'progress',
            this.videoBufferBar
          )
        }
      } catch (error) {
        return false
      }
    }
  }

  componentDidMount() {
    if (window.innerWidth <= 900) return
    ReactDOM.findDOMNode(this.ref.current).addEventListener('progress', e =>
      this.videoBufferBar(e)
    )
    ReactDOM.findDOMNode(this.ref.current).addEventListener(
      'timeupdate',
      event => {
        if (!isNaN(event.target.duration)) {
          this.setState({
            videoCurrentTime: event.target.currentTime / event.target.duration
          })
        }
      }
    )
  }

  componentWillUnmount() {
    if (window.innerWidth <= 900) return
    ReactDOM.findDOMNode(this.ref.current).removeEventListener(
      'progress',
      this.videoBufferBar
    )
  }

  render() {
    const { src, poster } = this.props
    const style = {
      backgroundImage: 'url(' + poster + ')'
    }
    return (
      <Fragment>
        {window.innerWidth > 900 && (
          <div className="opener video background-image" style={style}>
            <video
              ref={this.ref}
              data-keepplaying
              autoPlay
              loop
              muted
              poster={poster}
            >
              <source src={src} type="video/mp4" />
            </video>
            <div
              className="progressBarContainer preload"
              style={{
                display:
                  this.state.videoBuffer === 0 &&
                  this.state.videoCurrentTime === 0 &&
                  !this.state.videoLoaded
                    ? 'block'
                    : 'none'
              }}
            />
            <div className="progressBarContainer buffer">
              <div
                className="progressBar"
                style={{ width: this.state.videoBuffer * 100 + '%' }}
              />
            </div>
            <div className="progressBarContainer time">
              <div
                className="progressBar"
                style={{ width: this.state.videoCurrentTime * 100 + '%' }}
              />
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

export default OpenerVideo
