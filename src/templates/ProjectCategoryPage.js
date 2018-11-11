import React from 'react'
import { graphql } from 'gatsby'

import Image from '../components/Image'
import ProjectSection from '../components/ProjectSection'
import Layout from '../components/Layout'

import './ProjectCategoryPage.css'

// Export Template for use in CMS preview
export const ProjectCategoryPageTemplate = ({
  title,
  opener,
  overview,
  projects = [],
  projectCategories = [],
  testimonials,
  contentType
}) => {
  const isCategory = contentType === 'projectCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  const filteredProjects = isCategory ? projects.filter(byCategory) : projects

  return (
    <div className="project">
      {!!opener && (
        <div className="opener relative">
          <h1>{title}</h1>
          <div className="gradient" />
          <Image background resolutions="large" src={opener} alt={title} />
        </div>
      )}

      {/* Description Section */}

      {!!overview && (
        <section>
          <div className="thin flex">
            <div className="title">
              <h5>Our work</h5>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{overview}</p>
            </div>
          </div>
        </section>
      )}

      {/* Projects */}

      {!!projects.length && (
        <section className="dark">
          <div className="wide">
            <ProjectSection projects={filteredProjects} />
          </div>
        </section>
      )}
    </div>
  )
}

// Export Default ProjectCategoryPage for front-end
const ProjectCategoryPage = ({
  data: { page, projects, projectCategories }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectCategoryPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      projects={projects.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default ProjectCategoryPage

export const pageQuery = graphql`
  ## Query for ProjectCategoryPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ProjectCategoryPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        opener
        overview
        testimonials {
          content
          name
          company
        }
      }
    }

    projects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projects" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
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
            categories {
              category
            }
            featuredImage
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
  }
`
