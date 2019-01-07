import React from 'react'

import './Opener.css'

const OpenerVideo = ({ src, title }) => (
  <div className="opener video">
    <video autoplay loop muted playsinline>
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

export default OpenerVideo
