import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './ClientsSection.css'

const ClientsSection = ({ clients }) => (
  <div className="clients flex">
    {clients.map((item, index) => (
      <Link className="item flex" to={item.link} key={`client-${index}`}>
        <Image className="cover" src={item.logo} alt={item.title} />
      </Link>
    ))}
  </div>
)

export default ClientsSection
