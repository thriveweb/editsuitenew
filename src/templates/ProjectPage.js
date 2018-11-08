import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

// import PageHeader from '../components/PageHeader'
// import PostSection from '../components/PostSection'
import Image from '../components/Image'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const ProjectPageTemplate = ({
  title,
  opener,
  projectCategories = [],
  testimonials,
  contentType
}) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one', 'two', 'three'],
    scrollBar: false,
    navigation: false,
    verticalAlign: true,
    v2compatible: true
  }

  return (
    <SectionsContainer {...options}>
      <Section className="opener relative">
        <h1>{title}</h1>
        <div className="gradient" />
        <Image background src={opener} alt={title} />
      </Section>

      {/* Project Categories */}

      {!!projectCategories.length && (
        <Section>
          <div className="wide">
            <div className="title">
              <h5>Our specialities</h5>
              <h2>We are can offer</h2>
            </div>

            <ProjectCategories categories={projectCategories} />
          </div>
        </Section>
      )}

      {/* Testimonials Section */}

      {testimonials && (
        <Section className="dark">
          <div className="thin">
            <div className="title">
              <h5>Testimonials</h5>
              <h2>Don't take our word for it</h2>
            </div>

            <Testimonials testimonials={testimonials} />
          </div>
        </Section>
      )}
    </SectionsContainer>
  )
}

// Export Default ProjectPage for front-end
const ProjectPage = ({ data: { page, projectCategories } }) => (
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
    />
  </Layout>
)

export default ProjectPage

export const pageQuery = graphql`
  ## Query for ProjectPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ProjectPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        opener
        testimonials {
          content
          name
          company
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
