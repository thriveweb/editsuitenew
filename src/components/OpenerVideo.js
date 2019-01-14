import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './Opener.css'

class OpenerVideo extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = {
    videoBuffer: 0
  }

  videoBufferBar(event) {
    if (event.target.readyState === 4) {
      let range = 0,
        bf = event.target.buffered,
        time = event.target.currentTime
      console.log(range)
      console.log(bf)
      console.log(bf.start(range))
      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1
      }
      let loadStartPercentage = bf.start(range) / event.target.duration,
        loadEndPercentage = bf.end(range) / event.target.duration
      this.setState({
        videoBuffer: loadEndPercentage - loadStartPercentage
      })
      if (loadEndPercentage - loadStartPercentage === 1) {
        ReactDOM.findDOMNode(this.ref.current).removeEventListener(
          'progress',
          this.videoBufferBar
        )
      }
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.ref.current).addEventListener('progress', e =>
      this.videoBufferBar(e)
    )
  }

  render() {
    const { src, poster, title } = this.props
    const style = {
      backgroundImage: 'url(' + poster + ')'
    }
    return (
      <div className="opener video background-image" style={style}>
        <video
          ref={this.ref}
          data-keepplaying
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
        <progress value={this.state.videoBuffer} max="1" />
      </div>
    )
  }
}

export default OpenerVideo
