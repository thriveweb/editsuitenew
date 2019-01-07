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

const SingleClient = ({ data: { client, data } }) => {
  return (
    <Layout
      meta={client.frontmatter.meta || false}
      title={client.frontmatter.title || false}
    >
      {console.log(data)}
      <SingleClientTemplate
        {...client}
        {...client.frontmatter}
        body={client.html}
      />
    </Layout>
  )
}

export default SingleClient

export const pageQuery = graphql`
  query SingleClient($id: String!) {
    client: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        excerpt
        items {
          link
        }
      }
    }

    data: allMarkdownRemark(
      filter: {
        fields: {
          contentType: {
            in: [
              "events"
              "droneAerials"
              "motionGraphics"
              "businessStories"
              "promos"
              "photography"
              "posts"
            ]
          }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
            contentType
          }
          frontmatter {
            preview
            featuredImage
          }
        }
      }
    }
  }
`
