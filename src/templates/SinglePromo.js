import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import './SingleProject.css'

export const SinglePromoTemplate = ({ title, excerpt, video, tags }) => {
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

            {!!tags && <h5>{tags}</h5>}

            <Link
              className="back"
              to="/project-categories/promos-and-commercials"
            >
              Back to all
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  )
}

const SinglePromo = ({ data: { project } }) => {
  return (
    <Layout
      meta={project.frontmatter.meta || false}
      title={project.frontmatter.title || false}
    >
      <SinglePromoTemplate
        {...project}
        {...project.frontmatter}
        body={project.html}
      />
    </Layout>
  )
}

export default SinglePromo

export const pageQuery = graphql`
  query SinglePromo($id: String!) {
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
