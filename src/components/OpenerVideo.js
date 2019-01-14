import React from 'react'

import './Opener.css'

const OpenerVideo = ({ src, poster, title }) => (
  <div className="opener video">
    <video
      data-keepplaying
      autoPlay
      loop
      muted
      playsInline
      preload
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

export default OpenerVideo
