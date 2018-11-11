import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout.js'
import Image from '../components/Image.js'
import Content from '../components/Content.js'
import ClientsSection from '../components/ClientsSection.js'
import Testimonials from '../components/Testimonials.js'

import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  opener,
  icons = [],
  blurb,
  clients,
  testimonials = []
}) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one', 'two', 'three', 'four', 'five'],
    responsiveWidth: 900,
    navigation: false,
    verticalAlign: true,
    v2compatible: true,
    afterResponsive: function(isResponsive) {}
  }

  return (
    <SectionsContainer {...options}>
      <Section className="opener relative">
        <h1>{title}</h1>
        <div className="gradient" />
        <Image background resolutions="large" src={opener} alt={title} />
      </Section>

      {/* Icon Section */}

      {icons && (
        <Section>
          <div className="thin flex">
            {icons.map((item, index) => (
              <div className="icon" key={`${item.title} + ${index}`}>
                <Image src={item.icon} alt={item.title} />
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Blurb Section */}

      <Section className="light">
        <div className="wide">
          <div className="title">
            <h5>Our story</h5>
            <h2>More than just a pretty face</h2>
          </div>
          <div className="flex half">
            <div>
              <Image src={blurb.image} alt={title} className="cover" />
            </div>
            <Content src={blurb.content} />
          </div>
        </div>
      </Section>

      {/* Clients Section */}

      <Section>
        <div className="wide">
          <div className="title">
            <h5>Our clients</h5>
            <h2>Who we work with</h2>
          </div>

          <ClientsSection clients={clients} />
        </div>
      </Section>

      {/* Testimonials Section */}

      {testimonials && (
        <Section className="dark">
          <div className="thin">
            <div className="title">
              <h5>Testimonials</h5>
              <h2>Don't take our word for it</h2>
            </div>

            <Testimonials testimonials={testimonials} />
          </div>
        </Section>
      )}
    </SectionsContainer>
  )
}

const AboutPage = ({ data: { page, clients } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      clients={clients.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
    />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        opener
        icons {
          title
          icon
          description
        }
        blurb {
          image
          content
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
  }
`
