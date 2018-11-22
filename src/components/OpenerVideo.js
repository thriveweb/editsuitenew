import React from 'react'

import './Opener.css'

const OpenerVideo = ({ title, openerImage, src }) => (
  <div className="opener video">
    <h1>{title}</h1>
    <div className="gradient" />
    <iframe
      title={title}
      src={`https://player.vimeo.com/video/${src}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      frameBorder="0"
    />
  </div>
)

export default OpenerVideo
