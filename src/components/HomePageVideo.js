import React from 'react'

import './Opener.css'

const HomePageVideo = ({ src, title }) => (
  <div className="opener video">
    <video autoPlay loop preload="auto">
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

export default HomePageVideo
