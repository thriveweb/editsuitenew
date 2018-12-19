import React from 'react'

import './Opener.css'

const OpenerVideo = ({ src, title }) => (
  <div className="opener video">
    <iframe
      title={title}
      src={`https://player.vimeo.com/video/${src}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      frameBorder="0"
      allow="autoplay; fullscreen"
      rel="preload"
    />
  </div>
)

export default OpenerVideo
