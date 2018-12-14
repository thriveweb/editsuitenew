import React from 'react'

import './Opener.css'

const HomePageVideo = ({ src, title }) => (
  <div className="opener video">
    <video
      autoPlay
      preload="auto"
      poster="https://ucarecdn.com/2c1b9f47-69bc-4dd2-9e7b-7d2cea0f6a73/"
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

export default HomePageVideo
