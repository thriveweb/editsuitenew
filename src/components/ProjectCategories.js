import React from 'react'
import { Link } from 'gatsby'

import Image from './Image.js'
import './ProjectCategories.css'

const ProjectCategories = ({ categories }) => (
  <div className="project-cat flex">
    {categories.map((item, index) => (
      <Link
        className="item flex"
        style={{ order: item.order }}
        to={item.slug}
        key={`projectCategory-${index}`}
      >
        <h3>{item.title}</h3>
        <Image className="cover" src={item.preview} alt={item.title} />
      </Link>
    ))}
  </div>
)

export default ProjectCategories
