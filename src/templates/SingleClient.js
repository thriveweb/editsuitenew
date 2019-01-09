import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import ProjectSection from '../components/ProjectSection'
import Image from '../components/Image'
import './SingleProject.css'

export const SingleClientTemplate = ({ title, excerpt, logo, items }) => {
  return (
    <div className="project-single">
      <section className="full">
        <div className="thin">
          <div className="taCenter">
            <h1>{title}</h1>
            <Image className="cover" src={logo} alt={title} />
            <p>{excerpt}</p>
          </div>

          <div id="two" className="thick">
            <div className="wide">
              {!!items && <ProjectSection projects={items} />}
            </div>
          </div>

          <Link className="back" to="/#collaborations">
            Back to all
          </Link>
        </div>
      </section>
    </div>
  )
}

const fiterData = (filterArr, data) => {
  let items = [],
    filters = []

  if (filterArr.length) {
    for (let i in filterArr) {
      filters.push(filterArr[i].link)
    }

    for (let i in data) {
      if (filters.includes(data[i].node.fields.slug)) {
        items.push({
          ...data[i].node.fields,
          ...data[i].node.frontmatter
        })
      }
    }
  }

  return items
}

const SingleClient = ({ data: { client, data } }) => {
  console.log(client)
  const items = fiterData(client.frontmatter.items, data.edges)
  return (
    <Layout
      meta={client.frontmatter.meta || false}
      title={client.frontmatter.title || false}
    >
      <SingleClientTemplate
        {...client}
        {...client.frontmatter}
        items={items}
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
        logo
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
