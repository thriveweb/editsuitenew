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
            <Link className="back" to="/work#two/">
              Back to all
            </Link>

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
  data: { page, testimonials, projects, projectCategories, photography }
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
