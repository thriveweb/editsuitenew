import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import './SingleProject.css'

export const SingleMotionGraphicsTemplate = ({
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

  return (
    <div className="project-single">
      <section className="full">
        <div className="thin">
          <div className="taCenter">
            <h1>{title}</h1>
            <p>{excerpt}</p>
          </div>

          <div className="video">
            <iframe
              title={title}
              src={`https://player.vimeo.com/video/${video}`}
              frameBorder="0"
            />
          </div>

          {!!tags && <h5>tags: {tags}</h5>}

          <Link className="back" to={slug}>
            Back to all
          </Link>
        </div>
      </section>
    </div>
  )
}

const SingleMotionGraphics = ({
  data: { project, allProjects, projectCategories }
}) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SingleMotionGraphicsTemplate
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

export default SingleMotionGraphics

export const pageQuery = graphql`
  query SingleMotionGraphics($id: String!) {
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
      filter: { fields: { contentType: { eq: "motionGraphics" } } }
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
