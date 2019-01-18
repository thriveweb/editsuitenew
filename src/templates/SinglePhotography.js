import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Image from '../components/Image'
import './SinglePhotography.css'

export class SinglePhotographyTemplate extends React.Component {
  render() {
    const { title, excerpt, imageList } = this.props
    var defaults = {
      buttons: ['close'],
      arrows: false
    }

    return (
      <Fragment>
        <div className="photography-single dark">
          <div className="wide">
            <div className="taCenter">
              <h1>{title}</h1>
              <h3>{excerpt}</h3>
            </div>

            <Link className="back" to="/project-categories/photography">
              Back to all
            </Link>

            <div className="items-expand flex">
              {imageList.map((item, index) => (
                <div
                  className="item flex"
                  data-fancybox="gallery"
                  key={title + index}
                  href={item.img}
                  data-options={defaults}
                >
                  <Image
                    className="cover"
                    src={item.thumb}
                    alt={title + '-' + index}
                  />
                  {!!item.blurb && <p>{item.blurb}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
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
        excerpt
        imageList {
          img
          thumb
          blurb
        }
      }
    }
  }
`
