import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './Opener.css'

class OpenerVideo extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  state = {
    videoBuffer: 0
  }

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this.myRef.current))
    ReactDOM.findDOMNode(this.myRef.current).addEventListener(
      'progress',
      event => {
        if (event.target.readyState === 4) {
          var range = 0
          var bf = event.target.buffered
          var time = event.target.currentTime
          while (!(bf.start(range) <= time && time <= bf.end(range))) {
            range += 1
          }
          var loadStartPercentage = bf.start(range) / event.target.duration
          var loadEndPercentage = bf.end(range) / event.target.duration
          var loadPercentage = loadEndPercentage - loadStartPercentage
          this.setState({ videoBuffer: loadPercentage })
        }
      }
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
          ref={this.myRef}
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
