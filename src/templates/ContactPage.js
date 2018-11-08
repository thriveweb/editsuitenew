import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout'
import Image from '../components/Image'
import FormSimpleAjax from '../components/FormSimpleAjax'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({ title }) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['one'],
    scrollBar: false,
    navigation: false,
    verticalAlign: true,
    v2compatible: true
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
              <Image
                src="https://ucarecdn.com/c72d16a8-46bc-42e7-9186-4e221a19591b/"
                className="cover"
                alt=""
              />
            </div>
            <div>
              <h5>Office</h5>
              <p>2/2436 Gold Coast Hwy, Mermaid Beach QLD 4218, Australia</p>
              <br />
              <h5>Phone</h5>
              <p>(07) 5575 2185</p>
              <br />
              <h5>Email</h5>
              <p>info@theeditsuite.com.aua</p>
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
        title
      }
    }
  }
`
