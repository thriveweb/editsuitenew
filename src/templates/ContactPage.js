import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout'
import Image from '../components/Image'
import FormSimpleAjax from '../components/FormSimpleAjax'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({ title, contact }) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one'],
    responsiveWidth: 900,
    navigation: false,
    verticalAlign: true,
    v2compatible: true,
    afterResponsive: function(isResponsive) {}
  }

  return (
    <SectionsContainer {...options}>
      <Section>
        <div className="thin">
          <div className="title">
            <h5>Get in touch</h5>
            <h2>Let's work together</h2>
          </div>

          <FormSimpleAjax />

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
    </SectionsContainer>
  )
}

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        contact {
          map
          address
          phone
          email
        }
      }
    }
  }
`
