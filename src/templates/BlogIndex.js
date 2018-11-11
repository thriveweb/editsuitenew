import React from 'react'
import { graphql } from 'gatsby'

import Image from '../components/Image'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const BlogIndexTemplate = ({
  title,
  opener,
  overview,
  featuredImage,
  posts = [],
  contentType
}) => (
  <div className="blog">
    {!!opener && (
      <section>
        <div className="opener relative">
          <h1>{title}</h1>
          <div className="gradient" />
          <Image background resolutions="large" src={opener} alt={title} />
        </div>
      </section>
    )}

    {/* Projects */}

    {!!posts.length && (
      <div className="wide thick">
        <PostSection posts={posts} />
      </div>
    )}
  </div>
)

// Export Default BlogIndex for front-end
const BlogIndex = ({ data: { page, posts } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <BlogIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default BlogIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query BlogIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        opener
        overview
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage
            slug
          }
        }
      }
    }
  }
`
