import React from 'react'
import { graphql } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'

export const ProjectPageTemplate = ({
  title,
  openerText,
  openerVideo,
  openerImage,
  projectCategories = [],
  testimonials,
  contentType,
  isPreview
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
                >
                  {''}
                </div>
                {!!openerVideo && (
                  <OpenerVideo
                    src={openerVideo}
                    title={openerText}
                    alt={title}
                  />
                )}
                {!!openerImage && (
                  <OpenerImage
                    src={openerImage}
                    title={openerText}
                    alt={title}
                  />
                )}
              </div>

              {!!projectCategories && (
                <div className="section">
                  <div className="wide">
                    <SectionTitle
                      title="What we can offer"
                      subtitle="Our specialties"
                    />
                    <ProjectCategories categories={projectCategories} />
                  </div>
                </div>
              )}

              {!!testimonials && (
                <div className="section">
                  <div className="thin">
                    <SectionTitle
                      title="Don't take our word for it"
                      subtitle="Testimonials"
                    />
                    <Testimonials testimonials={testimonials} />
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

const ProjectPage = ({ data: { page, testimonials, projectCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
    />
  </Layout>
)

export default ProjectPage

export const pageQuery = graphql`
  query ProjectPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        openerText
        openerVideo
        openerImage
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
    ) {
      edges {
        node {
          frontmatter {
            name
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
            title
            order
            preview
            slug
          }
        }
      }
    }
  }
`
