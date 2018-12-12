import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ProjectSection from '../components/ProjectSection'

export const ProjectCategoryPageTemplate = ({
  title,
  sectionOpener,
  sectionOverview,
  projects = [],
  projectCategories = [],
  photography = [],
  motionGraphics = [],
  businessStories = [],
  droneAerials = [],
  events = [],
  promo = [],
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
  } else if ('/project-categories/promos-and-tv-cs/' === slug) {
    categorySelector = promo
  }

  return (
    <div className="project">
      <div className="full">
        <a className="arrow-down" href="#two">
          {''}
        </a>
        {!!sectionOpener.video && (
          <OpenerVideo src={sectionOpener.video} title={title} alt={title} />
        )}
        {!!sectionOpener.image && (
          <OpenerImage src={sectionOpener.image} title={title} alt={title} />
        )}
        {!!sectionOpener.mobile && (
          <OpenerMobile src={sectionOpener.mobile} title={title} alt={title} />
        )}
      </div>

      {!!sectionOverview && (
        <div id="two" className="thin thick flex">
          <SectionTitle
            title={sectionOverview.title}
            subtitle={sectionOverview.subtitle}
          />
          <div>
            <p>{sectionOverview.content}</p>
          </div>
        </div>
      )}

      {!!projects.length && (
        <div className="dark thick">
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

            {categorySelector === promo && <ProjectSection projects={promo} />}

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
    projects,
    projectCategories,
    motionGraphics,
    businessStories,
    droneAerials,
    events,
    promo,
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
      projects={projects.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
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
      promo={events.edges.map(post => ({
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
          title
          video
          image
          mobile
        }
        sectionOverview {
          title
          subtitle
          content
        }
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            content
          }
        }
      }
    }

    projects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projects" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
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
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
          }
        }
      }
    }

    businessStories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "businessStories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
          }
        }
      }
    }

    droneAerials: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "droneAerials" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
          }
        }
      }
    }

    events: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "events" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
          }
        }
      }
    }

    promo: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "promo" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            preview
            featuredImage
          }
        }
      }
    }

    photography: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "photography" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
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
