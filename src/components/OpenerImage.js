import React from 'react'

import Image from '../components/Image'
import './Opener.css'

const OpenerImage = ({ title, src, alt }) => (
  <div className="opener relative">
    <Image background resolutions="large" src={src} alt={alt} />
  </div>
)

export default OpenerImage
