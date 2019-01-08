import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'

export const ProjectPageTemplate = ({
  title,
  sectionOpener,
  sectionProjects,
  projectCategories = [],
  sectionTestimonials,
  testimonials,
  contentType
}) => {
  return (
    <div>
      <div className="section" id="promo">
        <a href="#specialities" className="arrow-down">
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

      {!!projectCategories && (
        <div className="section" id="specialities">
          <a href="#testimonials" className="arrow-down">
            {''}
          </a>
          <a href="#promo" className="arrow-up">
            {''}
          </a>
          <div className="wide">
            <SectionTitle
              title={sectionProjects.title}
              subtitle={sectionProjects.subtitle}
            />
            <ProjectCategories categories={projectCategories} />
          </div>
        </div>
      )}

      {!!sectionTestimonials && (
        <div className="section" id="testimonials">
          <a href="#specialities" className="arrow-up">
            {''}
          </a>
          <div className="thin">
            <SectionTitle
              title={sectionTestimonials.title}
              subtitle={sectionTestimonials.subtitle}
            />
            {!!testimonials && <Testimonials testimonials={testimonials} />}
          </div>
        </div>
      )}
    </div>
  )
}

const ProjectPage = ({ data: { page, testimonials, projectCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
    />
  </Layout>
)

export default ProjectPage

export const pageQuery = graphql`
  query ProjectPage($id: String!) {
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
        sectionProjects {
          title
          subtitle
        }
        sectionTestimonials {
          title
          subtitle
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
            title
            order
            preview
            slug
          }
        }
      }
    }
  }
`
