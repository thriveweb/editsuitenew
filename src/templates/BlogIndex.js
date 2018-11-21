import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import PostSection from '../components/PostSection'

export const BlogIndexTemplate = ({
  title,
  openerText,
  openerVideo,
  openerImage,
  overview,
  featuredImage,
  posts = [],
  contentType
}) => (
  <div>
    <div className="full">
      <a className="arrow-down" href="#two">
        {''}
      </a>
      {!!openerVideo && (
        <OpenerVideo src={openerVideo} title={openerText} alt={title} />
      )}
      {!!openerImage && (
        <OpenerImage src={openerImage} title={openerText} alt={title} />
      )}
    </div>

    {!!posts.length && (
      <div id="two" className="wide thick">
        <PostSection posts={posts} />
      </div>
    )}
  </div>
)

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
  query BlogIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        openerText
        openerVideo
        openerImage
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
