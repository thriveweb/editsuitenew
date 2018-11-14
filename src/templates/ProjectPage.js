import React from 'react'
import { graphql } from 'gatsby'

import Image from '../components/Image'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'
import Layout from '../components/Layout'

import './ProjectPage.css'

export const ProjectPageTemplate = ({
  title,
  opener,
  projectCategories = [],
  testimonials,
  contentType
}) => (
  <div>
    {!!opener && (
      <section>
        <div className="opener relative">
          <h1>{title}</h1>
          <div className="gradient" />
          <Image background resolutions="large" src={opener} alt={title} />
        </div>
      </section>
    )}

    {!!projectCategories.length && (
      <section>
        <div className="wide">
          <div className="title">
            <h5>Our specialities</h5>
            <h2>We are can offer</h2>
          </div>

          <ProjectCategories categories={projectCategories} />
        </div>
      </section>
    )}

    {!!testimonials && (
      <section className="dark">
        <div className="thin">
          <div className="title">
            <h5>Testimonials</h5>
            <h2>Don't take our word for it</h2>
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </section>
    )}
  </div>
)

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
