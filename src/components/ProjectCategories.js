import React from 'react'
import { Link } from 'gatsby'
import Image from './Image.js'

const ProjectCategories = ({ categories }) => (
  <div className="items-title flex">
    {categories.map((item, index) => {
      const img = item.sectionOpener
        ? item.sectionOpener.image
        : item.preview
        ? item.preview
        : ''
      return (
        <Link
          className="item flex"
          style={{ order: item.order }}
          to={item.slug}
          key={`projectCategory-${index}`}
        >
          <h3>{item.title}</h3>
          <Image className="cover" src={img} alt={item.title} />
        </Link>
      )
    })}
  </div>
)

export default ProjectCategories
