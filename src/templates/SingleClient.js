import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import './SingleProject.css'

export const SingleClientTemplate = ({
  title,
  excerpt,
  video,
  tags,
  projects = [],
  projectCategories = [],
  isCategory,
  category
}) => {
  return (
    <div className="project-single">
      <section className="full">
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
                allowFullScreen
              />
            </div>
          )}

          {!!tags && <h5>tags: {tags}</h5>}

          <Link className="back" to="/project-categories/drone-aerials">
            Back to all
          </Link>
        </div>
      </section>
    </div>
  )
}

const SingleClient = ({
  data: { project, allProjects, projectCategories }
}) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SingleClientTemplate
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

export default SingleClient

export const pageQuery = graphql`
  query SingleClient($id: String!) {
    project: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        excerpt
        links {
          link
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
  }
`
