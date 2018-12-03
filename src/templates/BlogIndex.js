import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import PostSection from '../components/PostSection'

export const BlogIndexTemplate = ({
  title,
  sectionOpener,
  posts = [],
  contentType
}) => (
  <div>
    <div className="full">
      <a className="arrow-down" href="#two">
        {''}
      </a>
      {!!sectionOpener.video && (
        <OpenerVideo
          src={sectionOpener.video}
          title={sectionOpener.title}
          alt={title}
        />
      )}
      {!!sectionOpener.image && (
        <OpenerImage
          src={sectionOpener.image}
          title={sectionOpener.title}
          alt={title}
        />
      )}
      {!!sectionOpener.mobile && (
        <OpenerMobile
          src={sectionOpener.mobile}
          title={sectionOpener.title}
          alt={title}
        />
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
        sectionOpener {
          title
          video
          image
          mobile
        }
        sectionOverview {
          content
        }
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
