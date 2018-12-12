import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectSection from '../components/ProjectSection'

export const MotionGraphicsPageTemplate = ({
  title,
  sectionOpener,
  sectionOverview,
  motionGraphics = [],
  testimonials,
  contentType,
  slug
}) => {
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

      {!!motionGraphics.length && (
        <div className="dark thick">
          <div className="wide">
            <Link className="back" to="/work#two/">
              Back to all
            </Link>

            <ProjectSection projects={motionGraphics} />
          </div>
        </div>
      )}
    </div>
  )
}

const MotionGraphicsPage = ({
  data: { page, testimonials, motionGraphics }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <MotionGraphicsPageTemplate
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
    />
  </Layout>
)

export default MotionGraphicsPage

export const pageQuery = graphql`
  query MotionGraphicsPage($id: String!) {
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
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
  }
`
