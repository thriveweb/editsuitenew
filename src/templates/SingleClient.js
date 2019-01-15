import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import ProjectSection from '../components/ProjectSection'
import Image from '../components/Image'
import './SingleProject.css'

export class SingleClientTemplate extends Component {
  state = {
    display: 'none'
  }
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      console.log('WAIT')
      this.setState({ display: 'block' })
    }, 1000)
  }

  render() {
    const { title, excerpt, logo, items } = this.props,
      style = { display: this.state.display }
    return (
      <div className="project-single" style={style}>
        <div className="section">
          <div className="thin">
            <div className="taCenter">
              <h1>{title}</h1>
              <Image className="cover" src={logo} alt={_kebabCase(title)} />
              <p>{excerpt}</p>
            </div>

            <div className="thick">
              <div className="wide">
                {!!items && <ProjectSection projects={items} />}
              </div>
            </div>

            <Link className="back" to="/#collaborations">
              Back to all
            </Link>
          </div>
        </div>
      </div>
    )
  }
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
            title
          }
        }
      }
    }
  }
`
