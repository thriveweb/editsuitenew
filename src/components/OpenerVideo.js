import React from 'react'

import './Opener.css'

const OpenerVideo = ({ src, title }) => (
  <div className="opener video">
    <video
      data-keepplaying
      autoPlay
      loop
      muted
      playsInline
      poster="images/test-porter.png"
    >
      <source src="/images/test.mp4" type="video/mp4" />
    </video>
  </div>
)

export default OpenerVideo

//<source src={src} type="video/mp4" />
