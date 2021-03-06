import React from 'react'
import { graphql } from 'gatsby'
import FullPage, { ArrowDown, ArrowUp } from '../components/FullPage'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'

export class ProjectPageTemplate extends React.Component {
  render() {
    const {
      title,
      sectionOpener,
      sectionProjects,
      projectCategories = [],
      sectionTestimonials,
      testimonials
    } = this.props

    return (
      <FullPage anchors={['promo', 'specialities', 'testimonials']}>
        <div>
          <div className="section" dataanchor="promo">
            <ArrowDown />
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

          {!!projectCategories && (
            <div className="section" dataanchor="specialities">
              <ArrowDown />
              <ArrowUp />
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
            <div className="section" dataanchor="testimonials">
              <ArrowUp />
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
      </FullPage>
    )
  }
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
          mobileImage
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
            slug
            sectionOpener {
              image
              mobileImage
            }
          }
        }
      }
    }
  }
`
