import React from 'react'

import Image from './Image.js'
import './Icons.css'

const Icons = ({ icons }) => (
  <div className="thin flex">
    {icons.map((item, index) => (
      <div className="icon" key={`${item.title} + ${index}`}>
        <Image src={item.icon} alt={item.title} />
        <h5>{item.title}</h5>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
)

export default Icons
