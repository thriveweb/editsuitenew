import React from 'react'

import './Opener.css'

const OpenerVideo = ({ src, title }) => (
  <div className="opener video">
    <video data-keepplaying autoplay loop playsinline muted>
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

export default OpenerVideo
