import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import './SingleProject.css'

export const SingleProjectTemplate = ({ title, excerpt, video, tags }) => (
  <div className="project-single">
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

// Export Default SingleProject for front-end
const SingleProject = ({ data: { project, allProjects } }) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SingleProjectTemplate
        {...project}
        {...project.frontmatter}
        body={project.html}
      />
    </Layout>
  )
}

export default SingleProject

export const pageQuery = graphql`
  ## Query for SingleProject data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
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
