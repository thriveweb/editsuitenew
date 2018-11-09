import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout'
import './SingleProject.css'

export const SingleProjectTemplate = ({ title, excerpt, categories = [] }) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one'],
    scrollBar: false,
    navigation: false,
    verticalAlign: true,
    v2compatible: true
  }

  return (
    <div className="project-single">
      <SectionsContainer {...options}>
        <Section className="opener relative">
          <div className="thin">
            <div className="taCenter">
              <h1>{title}</h1>
              <p>{excerpt}</p>
            </div>

            <div className="video">
              <iframe
                title={title}
                src="https://player.vimeo.com/video/155115360?color=ffffff&title=0&byline=0"
                frameBorder="0"
              />
            </div>
          </div>
        </Section>
      </SectionsContainer>
    </div>
  )
}

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
        categories {
          category
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
