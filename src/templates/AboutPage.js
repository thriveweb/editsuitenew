import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout.js'
import Image from '../components/Image.js'
import Content from '../components/Content.js'
import Testimonials from '../components/Testimonials.js'

import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  icons = [],
  blurb,
  testimonials = []
}) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one', 'two', 'three', 'four', 'five'],
    scrollBar: false,
    navigation: false,
    verticalAlign: true,
    v2compatible: true
  }

  return (
    <SectionsContainer {...options}>
      <Section className="opener relative">
        <h1>{title}</h1>
        <div className="gradient" />
        <Image background src="/images/about.jpg" alt={title} />
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
            <h5>{blurb.subtitle}</h5>
            <h2>{blurb.title}</h2>
          </div>
          <div className="flex half">
            <div>
              <Image src={blurb.column1} alt={blurb.title} className="cover" />
            </div>
            <Content src={blurb.column2} />
          </div>
        </div>
      </Section>

      {/* Clients Section */}

      <Section>
        <div className="thin">
          <div className="title">
            <h5>Our clients</h5>
            <h2>Who we work with</h2>
          </div>
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

const AboutPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate {...page} {...page.frontmatter} body={page.html} />
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
        icons {
          title
          icon
          description
        }
        blurb {
          title
          subtitle
          column1
          column2
        }
        testimonials {
          content
          name
          company
        }
      }
    }
  }
`
