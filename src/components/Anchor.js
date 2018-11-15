import React from 'react'
import './Anchor.css'

export default ({ to, up, down }) => (
  <a href={`#${to}`} className={down ? 'arrow-down' : up ? 'arrow-up' : null}>
    {''}
  </a>
)
