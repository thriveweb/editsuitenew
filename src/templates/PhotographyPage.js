import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import ProjectCategories from '../components/ProjectCategories'
import Footer from '../components/Footer'

export class PhotographyPageTemplate extends Component {
  state = {
    display: 'none'
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      console.log('WAIT')
      this.setState({ display: 'block' })
    }, 1000)
  }

  render() {
    const { title, sectionOpener, photography = [] } = this.props,
      style = { display: this.state.display }

    return (
      <div style={style}>
        <div className="section" id="promo">
          <a className="arrow-down" href="#photography">
            {''}
          </a>
          {!!title && (
            <div className="full open">
              <div className="taCenter">
                <h1>{title}</h1>
                {!!sectionOpener.byline && <h3>{sectionOpener.byline}</h3>}
              </div>
            </div>
          )}
          <div className="gradient" />
          {!!sectionOpener.video && (
            <OpenerVideo src={sectionOpener.video} alt={title} />
          )}
          {!!sectionOpener.image && (
            <OpenerImage src={sectionOpener.image} alt={title} />
          )}
          {!!sectionOpener.mobile && (
            <OpenerMobile src={sectionOpener.mobile} alt={title} />
          )}
        </div>

        {!!photography && (
          <div className="section" id="photography">
            <div className="wide">
              <Link className="back" to="/work#two/">
                Back to all
              </Link>

              <ProjectCategories categories={photography} />
            </div>
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

const PhotographyPage = ({ data: { page, photography } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <PhotographyPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      photography={photography.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default PhotographyPage

export const pageQuery = graphql`
  query PhotographyPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        slug
        contentType
      }
      frontmatter {
        title
        sectionOpener {
          byline
          video
          image
          mobile
        }
      }
    }

    photography: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "photography" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
          }
        }
      }
    }
  }
`
