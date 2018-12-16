import React from 'react'
import { graphql, Link } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import ProjectCategories from '../components/ProjectCategories'

export const PhotographyPageTemplate = ({
  title,
  sectionOpener,
  projectCategories = [],
  photography = [],
  testimonials,
  contentType,
  slug
}) => {
  let options = {
    licenceKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors: ['one', 'two', 'three', 'four', 'five'],
    responsiveWidth: 900,
    verticalAlign: true,
    navigation: false
  }

  return (
    <ReactFullpage
      {...options}
      render={({ state, fullpageApi }) => {
        return (
          <div>
            <ReactFullpage.Wrapper>
              <div className="section">
                <div
                  className="arrow-down"
                  onClick={() => fullpageApi.moveSectionDown()}
                />
                {!!title && (
                  <div className="full open">
                    <div className="taCenter">
                      <h1>{title}</h1>
                      {!!sectionOpener.byline && (
                        <h3>{sectionOpener.byline}</h3>
                      )}
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
                <div className="section">
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <div className="wide">
                    <Link className="back" to="/work#two/">
                      Back to all
                    </Link>

                    <ProjectCategories categories={photography} />
                  </div>
                </div>
              )}
            </ReactFullpage.Wrapper>
          </div>
        )
      }}
    />
  )
}

const PhotographyPage = ({
  data: { page, testimonials, projectCategories, photography }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <PhotographyPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
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

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            order
            title
            company
            content
          }
        }
      }
    }

    projectCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projectCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            slug
          }
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
