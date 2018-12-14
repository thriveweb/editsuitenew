import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import ProjectCategories from '../components/ProjectCategories'
import ProjectSection from '../components/ProjectSection'

export const ProjectCategoryPageTemplate = ({
  title,
  sectionOpener,
  projectCategories = [],
  photography = [],
  motionGraphics = [],
  businessStories = [],
  droneAerials = [],
  events = [],
  promos = [],
  testimonials,
  contentType,
  slug
}) => {
  let categorySelector = []

  if ('/project-categories/photography/' === slug) {
    categorySelector = photography
  } else if ('/project-categories/motion-graphics/' === slug) {
    categorySelector = motionGraphics
  } else if ('/project-categories/business-stories/' === slug) {
    categorySelector = businessStories
  } else if ('/project-categories/drone-aerials/' === slug) {
    categorySelector = droneAerials
  } else if ('/project-categories/events/' === slug) {
    categorySelector = events
  } else if ('/project-categories/promos-and-tvcs/' === slug) {
    categorySelector = promos
  } else {
    categorySelector = ''
  }

  return (
    <div className="project">
      <div className="full">
        <a className="arrow-down" href="#two">
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
          <OpenerVideo src={sectionOpener.video} alt={title} />
        )}
        {!!sectionOpener.image && (
          <OpenerImage src={sectionOpener.image} alt={title} />
        )}
        {!!sectionOpener.mobile && (
          <OpenerMobile src={sectionOpener.mobile} alt={title} />
        )}
      </div>

      {!!categorySelector && (
        <div id="two" className="thick">
          <div className="wide">
            <Link className="back" to="work#two">
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

            {categorySelector === photography && (
              <ProjectCategories categories={photography} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ProjectCategoryPage = ({
  data: {
    page,
    testimonials,
    projectCategories,
    motionGraphics,
    businessStories,
    droneAerials,
    events,
    promos,
    photography
  }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectCategoryPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
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
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      photography={photography.edges.map(post => ({
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
          mobile
        }
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            order
            title
            company
            content
          }
        }
      }
    }

    projectCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projectCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            slug
          }
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

    photography: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "photography" } } }
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
          }
        }
      }
    }
  }
`
