import React from 'react'
import { graphql, Link } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout'
import Image from '../components/Image'
import Testimonials from '../components/Testimonials'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  opener,
  intro,
  testimonials,
  contact
}) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one', 'two', 'three', 'four', 'five', 'six'],
    scrollBar: false,
    navigation: false,
    verticalAlign: true,
    v2compatible: true
  }

  return (
    <SectionsContainer {...options}>
      <Section className="opener relative">
        <div className="gradient" />
        <Image background src={opener} alt={title} />
      </Section>

      {/* Intro Section */}

      {intro && (
        <Section>
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
        </Section>
      )}

      {/* Services Section */}

      <Section className="light">
        <div className="thin">
          <div className="title">
            <h5>Our specialties</h5>
            <h2>What we can offer</h2>
          </div>
        </div>
      </Section>

      {/* Clients Section */}

      <Section className="dark">
        <div className="thin">
          <div className="title">
            <h5>Our clients</h5>
            <h2>Who we work with</h2>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}

      {testimonials && (
        <Section>
          <div className="thin">
            <div className="title">
              <h5>Testimonials</h5>
              <h2>Don't take our word for it</h2>
            </div>

            <Testimonials testimonials={testimonials} />
          </div>
        </Section>
      )}

      {/* Contact Section */}

      {contact && (
        <Section className="dark">
          <div className="thin">
            <div className="title">
              <h5>Get in touch</h5>
              <h2>Let's work together</h2>
            </div>
            <div className="flex half">
              <div className="map">
                <Image src={contact.map} className="cover" alt={title} />
              </div>
              <div>
                <h5>Office</h5>
                <p>{contact.address}</p>
                <br />

                <h5>Phone</h5>
                <a href={`tel:${contact.phone}`}>
                  <p>{contact.phone}</p>
                </a>
                <br />

                <h5>Email</h5>
                <a href={`mailto:${contact.email}`}>
                  <p>{contact.email}</p>
                </a>
              </div>
            </div>
          </div>
        </Section>
      )}
    </SectionsContainer>
  )
}

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
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
        contact {
          map
          address
          email
          phone
        }
      }
    }
  }
`
