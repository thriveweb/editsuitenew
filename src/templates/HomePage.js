import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  opener,
  intro,
  projectCategories = [],
  clients,
  testimonials,
  isPreview,
  phone,
  email,
  address
}) => {
  return (
    <div className="home">
      {!!opener && (
        <section>
          <div className="opener relative">
            <div className="gradient" />
            <Image background resolutions="large" src={opener} alt={title} />
          </div>
        </section>
      )}

      {/* Intro Section */}

      {!!intro && (
        <section>
          <div className="thin flex">
            <div className="title">
              <h5>What we do</h5>
              <h2>We are creators</h2>
            </div>
            <div>
              <p>{intro.description}</p>
              <Link to={intro.buttonLink} className="button">
                {intro.buttonText}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Project Categories */}

      {!!projectCategories.length && (
        <section className="light">
          <div className="wide">
            <div className="title">
              <h5>Our specialities</h5>
              <h2>We are can offer</h2>
            </div>

            <ProjectCategories categories={projectCategories} />
          </div>
        </section>
      )}

      {/* Clients Section */}

      {!!clients && (
        <section className="dark">
          <div className="wide">
            <div className="title">
              <h5>Our clients</h5>
              <h2>Who we work with</h2>
            </div>

            <ClientsSection clients={clients} />
          </div>
        </section>
      )}

      {/* Testimonials Section */}

      {!isPreview &&
        !!testimonials && (
          <section className="dark">
            <div className="thin">
              <div className="title">
                <h5>Testimonials</h5>
                <h2>Don't take our word for it</h2>
              </div>

              <Testimonials testimonials={testimonials} />
            </div>
          </section>
        )}

      {/* Contact Section */}

      <section className="dark">
        <div className="thin">
          <div className="title">
            <h5>Get in touch</h5>
            <h2>Let's work together</h2>
          </div>
          <div className="flex half">
            <div className="map">
              <Image
                src="https://ucarecdn.com/d125b741-0a56-41d3-a358-bdfd18ce905f/"
                className="cover"
                alt={title}
              />
            </div>
            <div>
              <h5>Office</h5>
              <p>{address}</p>
              <br />

              <h5>Phone</h5>
              <a href={`tel:${phone}`}>
                <p>{phone}</p>
              </a>
              <br />

              <h5>Email</h5>
              <a href={`mailto:${email}`}>
                <p>{email}</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Export Default HomePage for front-end
const HomePage = ({
  data: { page, clients, projectCategories, globalSettings }
}) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      {...globalSettings}
      body={page.html}
      clients={clients.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        opener
        intro {
          description
          buttonText
          buttonLink
        }
        testimonials {
          content
          name
          company
        }
      }
    }

    clients: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/clients/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            logo
            link
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

    globalSettings: settingsYaml {
      phone
      address
      email
    }
  }
`
