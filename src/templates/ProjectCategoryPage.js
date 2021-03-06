import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import ProjectSection from '../components/ProjectSection'
import Footer from '../components/Footer'

export const ProjectCategoryPageTemplate = ({
  title,
  sectionOpener,
  motionGraphics = [],
  businessStories = [],
  droneAerials = [],
  events = [],
  promos = [],
  slug
}) => {
  let categorySelector = []

  if ('/project-categories/motion-graphics/' === slug) {
    categorySelector = motionGraphics
  } else if ('/project-categories/business-stories/' === slug) {
    categorySelector = businessStories
  } else if ('/project-categories/drone-aerials/' === slug) {
    categorySelector = droneAerials
  } else if ('/project-categories/events/' === slug) {
    categorySelector = events
  } else if ('/project-categories/promos-and-commercials/' === slug) {
    categorySelector = promos
  } else {
    categorySelector = ''
  }

  return (
    <Fragment>
      <div className="project">
        <div className="section">
          <a className="arrow-down" href="#stories">
            {''}
          </a>
          {!!title && (
            <div className="full open">
              <div className="taCenter">
                <h1>{title}</h1>
                {!!sectionOpener.byline && <h3>{sectionOpener.byline}</h3>}
              </div>
            </div>
          )}
          <div className="gradient" />
          {!!sectionOpener.video && (
            <OpenerVideo
              src={sectionOpener.video}
              poster={sectionOpener.image}
              alt={title}
            />
          )}
          {!!sectionOpener.image && !sectionOpener.video && (
            <OpenerImage src={sectionOpener.image} alt={title} />
          )}
          {!!sectionOpener.mobileImage && (
            <OpenerMobile src={sectionOpener.mobileImage} alt={title} />
          )}
        </div>

        {!!categorySelector && (
          <div id="stories" className="thick">
            <div className="wide">
              <Link className="back" to="/work#specialities">
                Back to all
              </Link>

              {categorySelector === motionGraphics && (
                <ProjectSection projects={motionGraphics} />
              )}

              {categorySelector === businessStories && (
                <ProjectSection projects={businessStories} />
              )}

              {categorySelector === droneAerials && (
                <ProjectSection projects={droneAerials} />
              )}

              {categorySelector === events && (
                <ProjectSection projects={events} />
              )}

              {categorySelector === promos && (
                <ProjectSection projects={promos} />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  )
}

const ProjectCategoryPage = ({
  data: { page, motionGraphics, businessStories, droneAerials, events, promos }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectCategoryPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      motionGraphics={motionGraphics.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      businessStories={businessStories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      droneAerials={droneAerials.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      events={events.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      promos={promos.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default ProjectCategoryPage

export const pageQuery = graphql`
  query ProjectCategoryPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        slug
        contentType
      }
      frontmatter {
        title
        sectionOpener {
          byline
          video
          image
          mobileImage
        }
      }
    }

    motionGraphics: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "motionGraphics" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
            featuredImage
          }
        }
      }
    }

    businessStories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "businessStories" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
            featuredImage
          }
        }
      }
    }

    droneAerials: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "droneAerials" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
            featuredImage
          }
        }
      }
    }

    events: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "events" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
            featuredImage
          }
        }
      }
    }

    promos: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "promos" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            preview
            featuredImage
          }
        }
      }
    }
  }
`
