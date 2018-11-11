import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import FormSimpleAjax from '../components/FormSimpleAjax'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({ title }) => (
  <div className="contact">
    <section>
      <div className="thin">
        <div className="title">
          <h5>Get in touch</h5>
          <h2>Let's work together</h2>
        </div>

        <FormSimpleAjax />

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
            <p>2/2436 Gold Coast Hwy, Mermaid Beach QLD 4218, Australia</p>
            <br />

            <h5>Phone</h5>
            <a href={`tel:(07) 5575 2185`}>
              <p>(07) 5575 2185</p>
            </a>
            <br />

            <h5>Email</h5>
            <a href={`mailto:$info@theeditsuite.com.au`}>
              <p>info@theeditsuite.com.au</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
)

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
