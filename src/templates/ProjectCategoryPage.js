import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Anchor from '../components/Anchor'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ProjectSection from '../components/ProjectSection'

export const ProjectCategoryPageTemplate = ({
  title,
  openerVideo,
  openerImage,
  overview,
  projects = [],
  projectCategories = [],
  photography = [],
  testimonials,
  contentType,
  slug
}) => {
  const isCategory = contentType === 'projectCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  const filteredProjects = isCategory ? projects.filter(byCategory) : projects

  let categorySelector = []
  if ('/project-categories/photography/' === slug) {
    categorySelector = photography
  } else {
    categorySelector = filteredProjects
  }

  return (
    <div className="project">
      <section>
        <Anchor down to="two" />
        {!!openerVideo && <OpenerVideo src={openerVideo} title={title} />}
        {!!openerImage && <OpenerImage src={openerImage} title={title} />}
      </section>

      {!!overview && (
        <div id="two" className="thin thick flex">
          <SectionTitle title={title} subtitle="Our work" />
          <div>
            <p>{overview}</p>
          </div>
        </div>
      )}

      {!!projects.length && (
        <div className="dark thick">
          <div className="wide">
            {categorySelector === filteredProjects && (
              <ProjectSection projects={categorySelector} />
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
  data: { page, projects, projectCategories, photography }
}) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectCategoryPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      projects={projects.edges.map(post => ({
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
        openerVideo
        openerImage
        overview
        testimonials {
          content
          name
          company
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
