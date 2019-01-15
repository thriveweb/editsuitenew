import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import './SingleProject.css'

export const SingleBusinessStoriesTemplate = ({
  title,
  excerpt,
  video,
  tags
}) => {
  return (
    <Fragment>
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

            <Link className="back" to="/project-categories/business-stories">
              Back to all
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  )
}

const SingleBusinessStories = ({ data: { project } }) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SingleBusinessStoriesTemplate
        {...project}
        {...project.frontmatter}
        body={project.html}
      />
    </Layout>
  )
}

export default SingleBusinessStories

export const pageQuery = graphql`
  query SingleBusinessStories($id: String!) {
    project: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        excerpt
        video
        tags
      }
    }
  }
`
