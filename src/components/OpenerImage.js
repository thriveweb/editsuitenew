import React from 'react'

import Image from '../components/Image'
import './Opener.css'

const OpenerImage = ({ title, src }) => (
  <div className="opener relative">
    {!!title && <h1>{title}</h1>}
    <div className="gradient" />
    <Image background resolutions="large" src={src} alt={title} />
  </div>
)

export default OpenerImage
