import React from 'react'

export default ({ to, up, down }) => (
  <a href={`#${to}`} className={down ? 'arrow-down' : up ? 'arrow-up' : null}>
    {''}
  </a>
)
