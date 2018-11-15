import React from 'react'
import { graphql } from 'gatsby'

import Image from '../components/Image'
import Anchor from '../components/Anchor'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'
import Layout from '../components/Layout'

export const ProjectPageTemplate = ({
  title,
  opener,
  projectCategories = [],
  testimonials,
  contentType
}) => (
  <div className="scroll-jack">
    {!!opener && (
      <section id="one">
        <Anchor down to="two" />
        <div className="opener relative">
          <h1>{title}</h1>
          <div className="gradient" />
          <Image background resolutions="large" src={opener} alt={title} />
        </div>
      </section>
    )}

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
        opener
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
