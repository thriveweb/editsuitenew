import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import PostSection from '../components/PostSection'
import Footer from '../components/Footer'

export const BlogIndexTemplate = ({
  title,
  sectionOpener,
  posts = [],
  contentType
}) => (
  <Fragment>
    <div className="section">
      <a className="arrow-down" href="#two">
        {''}
      </a>
      {!!sectionOpener.title && (
        <div className="full open">
          <div className="taCenter">
            <h1>{sectionOpener.title}</h1>
            {!!sectionOpener.byline && <h3>{sectionOpener.byline}</h3>}
          </div>
        </div>
      )}
      <div className="gradient" />
      {!!sectionOpener.video && (
        <OpenerVideo src={sectionOpener.video} alt={title} />
      )}
      {!!sectionOpener.image && (
        <OpenerImage src={sectionOpener.image} alt={title} />
      )}
      {!!sectionOpener.mobile && (
        <OpenerMobile src={sectionOpener.mobile} alt={title} />
      )}
    </div>

    {!!posts.length && (
      <div id="two" className="wide thick">
        <PostSection posts={posts} />
      </div>
    )}

    <Footer />
  </Fragment>
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
          byline
          video
          image
          mobile
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
