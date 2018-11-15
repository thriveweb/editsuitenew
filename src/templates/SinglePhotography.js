import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import './SinglePhotography.css'

class SinglePhotographyTemplate extends React.Component {
  render() {
    const { title, images } = this.props
    var defaults = {
      buttons: ['close'],
      arrows: false
    }

    return (
      <div className="photography-single dark">
        <div className="wide">
          <div className="taCenter">
            <h1>{title}</h1>
          </div>

          <div className="items-expand flex">
            {images.map((item, index) => (
              <div
                className="item flex"
                data-fancybox="gallery"
                key={title + index}
                href={item}
                data-options={defaults}
              >
                <img className="cover" src={item} alt={title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
const SinglePhotography = ({ data: { photography } }) => {
  return (
    <Layout
      meta={photography.frontmatter.meta || false}
      title={photography.frontmatter.title || false}
    >
      <SinglePhotographyTemplate
        {...photography}
        {...photography.frontmatter}
        body={photography.html}
      />
    </Layout>
  )
}

export default SinglePhotography

export const pageQuery = graphql`
  query SinglePhotography($id: String!) {
    photography: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        images
      }
    }
  }
`
