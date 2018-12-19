import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'

import Content from '../components/Content'
import Image from '../components/Image'
import Layout from '../components/Layout'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL
}) => (
  <div className="single-post">
    {!!featuredImage && (
      <div className="opener relative">
        <div className="taCenter">
          <h1>{title}</h1>
          <h5>{date}</h5>
        </div>
        <div className="gradient" />
        <Image background resolutions="large" src={featuredImage} alt={title} />
      </div>
    )}

    <div className="thin thick">
      <Content src={body} />

      <div className="pagination">
        {prevPostURL && (
          <Link className="button prev" to={prevPostURL}>
            Previous
          </Link>
        )}
        {nextPostURL && (
          <Link className="button next" to={nextPostURL}>
            Next
          </Link>
        )}

        <div className="clear" />
      </div>
    </div>
  </div>
)

const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        date
        featuredImage
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
