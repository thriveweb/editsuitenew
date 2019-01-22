import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Image from '../components/Image'
import { PhotoSwipe } from 'react-photoswipe'
import './SinglePhotography.css'
import 'react-photoswipe/lib/photoswipe.css'

export class SinglePhotographyTemplate extends React.Component {
  state = {
    loaded: false,
    isOpen: false,
    images: [],
    index: 0
  }

  close() {
    this.setState({ isOpen: false })
  }

  open(index) {
    this.setState({ isOpen: true, index: index })
  }

  componentDidMount() {
    const { imageList } = this.props,
      maxCount = imageList.length
    let loopCount = 1

    for (let i in imageList) {
      const img = imageList[i]
      fetch(img.thumb + '-/json/')
        .then(res => res.json())
        .then(
          result => {
            const newImage = {
              src: img.thumb,
              title: img.blurb,
              w: result.width,
              h: result.height
            }
            this.setState({
              images:
                this.state.images.length > 0
                  ? [...this.state.images, newImage]
                  : [newImage]
            })
            if (loopCount === maxCount) {
              this.setState({ loaded: true })
            }
            loopCount++
          },
          error => {
            console.log(error)
          }
        )
    }
  }

  render() {
    const { title, excerpt, imageList } = this.props

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

          {this.state.loaded && this.state.images.length > 0 && (
            <PhotoSwipe
              isOpen={this.state.isOpen}
              items={this.state.images}
              options={{
                index: this.state.index
              }}
              onClose={e => this.close(e)}
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
