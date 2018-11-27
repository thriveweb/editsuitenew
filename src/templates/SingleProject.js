import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import './SingleProject.css'

export const SingleProjectTemplate = ({
  title,
  excerpt,
  video,
  tags,
  projects = [],
  projectCategories = [],
  isCategory,
  categories
}) => {
  const currentCategory = categories[0].category
  let slug = ''

  for (let cat in projectCategories) {
    if (projectCategories[cat].frontmatter.title === currentCategory) {
      slug = projectCategories[cat].fields.slug
    }
  }

  console.log(slug)

  return (
    <div className="project-single full">
      <section>
        <div className="thin">
          <div className="taCenter">
            <h1>{title}</h1>
            <p>{excerpt}</p>
          </div>

          {!!video && (
            <div className="video">
              <iframe
                title={title}
                src={`https://player.vimeo.com/video/${video}`}
                frameBorder="0"
              />
            </div>
          )}

          {!!tags && <h5>tags: {tags}</h5>}
        </div>
      </section>
    </div>
  )
}

const SingleProject = ({
  data: { project, allProjects, projectCategories }
}) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SingleProjectTemplate
        {...project}
        {...project.frontmatter}
        body={project.html}
        projectCategories={projectCategories.edges.map(post => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
      />
    </Layout>
  )
}

export default SingleProject

export const pageQuery = graphql`
  query SingleProject($id: String!) {
    project: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        excerpt
        video
        tags
        categories {
          category
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
            title
          }
        }
      }
    }

    allProjects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projects" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`
