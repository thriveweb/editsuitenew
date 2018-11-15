import React from 'react'
import { graphql } from 'gatsby'
import Popup from 'reactjs-popup'

import Layout from '../components/Layout'
import Image from '../components/Image'
import './SinglePhotography.css'

class SinglePhotographyTemplate extends React.Component {
  static defaultProps = {
    popup: []
  }

  state = {
    popupOpen: false,
    popupImagePath: null
  }

  openModal = popupImagePath => {
    this.setState({ popupOpen: true })
    this.setState({ popupImagePath: popupImagePath })
  }
  closeModal = () => {
    this.setState({ popupOpen: false })
  }

  render() {
    const { title, images } = this.props

    return (
      <div className="photography-single dark">
        <div className="wide">
          <div className="taCenter">
            <h1>{title}</h1>
          </div>

          <Popup modal open={this.state.popupOpen} onClose={this.closeModal}>
            <div className="close" onClick={this.closeModal} />
            <Image
              resolutions="large"
              src={this.state.popupImagePath}
              alt={title}
            />
          </Popup>

          {!!images && (
            <div className="items-expand flex">
              {images.map((item, index) => (
                <div
                  className="item flex"
                  key={title + index}
                  onClick={() => {
                    this.openModal(item)
                  }}
                >
                  <Image
                    resolutions="large"
                    src={item}
                    alt={title}
                    className="cover"
                  />
                </div>
              ))}
            </div>
          )}
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
