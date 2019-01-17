import React from 'react'
import { Link } from 'gatsby'

import Image from './Image.js'

const ProjectCategories = ({ categories }) => (
  <div className="items-title flex">
    {categories.map((item, index) => (
      <Link
        className="item flex"
        style={{ order: item.order }}
        to={item.slug}
        key={`projectCategory-${index}`}
      >
        <h3>{item.title}</h3>
        <Image
          className="cover"
          src={item.sectionOpener.image}
          alt={item.title}
        />
      </Link>
    ))}
  </div>
)

export default ProjectCategories
