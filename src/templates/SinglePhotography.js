import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Image from '../components/Image'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './SinglePhotography.css'

export class SinglePhotographyTemplate extends React.Component {
  state = {
    photoIndex: 0,
    isOpen: false,
    bodyOverflow: ''
  }

  open(index) {
    this.setState({
      isOpen: true,
      photoIndex: index,
      bodyOverflow: document.body.style.overflow
    })
    document.body.style.overflow = 'hidden'
  }

  close() {
    document.body.style.overflow = this.state.bodyOverflow
    this.setState({ isOpen: false, bodyOverflow: '' })
  }

  render() {
    const { title, excerpt, imageList } = this.props,
      { photoIndex, isOpen } = this.state,
      images = imageList.map(item => item.thumb)

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
                  key={title + index}
                  onClick={() => this.open(index)}
                >
                  <Image resolutions="small" src={item.thumb} alt={title} />
                  {!!item.blurb && <p>{item.blurb}</p>}
                </div>
              ))}
            </div>
          </div>

          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.close()}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length
                })
              }
            />
          )}
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
