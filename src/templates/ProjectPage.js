import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Anchor from '../components/Anchor'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'

export const ProjectPageTemplate = ({
  title,
  openerVideo,
  openerImage,
  projectCategories = [],
  testimonials,
  contentType
}) => (
  <div className="scroll-jack">
    <section id="one">
      <Anchor down to="two" />
      {!!openerVideo && <OpenerVideo src={openerVideo} title={title} />}
      {!!openerImage && <OpenerImage src={openerImage} title={title} />}
    </section>

    {!!projectCategories.length && (
      <section id="two">
        <Anchor up to="one" /> <Anchor down to="three" />
        <div className="wide">
          <SectionTitle title="What we can offer" subtitle="Our specialties" />
          <ProjectCategories categories={projectCategories} />
        </div>
      </section>
    )}

    {!!testimonials && (
      <section id="three" className="dark">
        <Anchor up to="two" />
        <div className="thin">
          <SectionTitle
            title="Don't take our word for it"
            subtitle="Testimonials"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>
    )}
  </div>
)

const ProjectPage = ({ data: { page, projectCategories } }) => (
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
        openerVideo
        openerImage
        testimonials {
          content
          name
          company
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
