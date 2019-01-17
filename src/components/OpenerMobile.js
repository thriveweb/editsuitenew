import React from 'react'

import Image from '../components/Image'
import './Opener.css'

const OpenerImage = ({ title, src, alt }) => (
  <div className="opener mobile relative">
    <Image background resolutions="small" src={src} alt={alt} />
  </div>
)

export default OpenerImage
