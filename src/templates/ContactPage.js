import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import FormSimpleAjax from '../components/FormSimpleAjax'
import GoogleMap from '../components/GoogleMap'

import './ContactPage.css'

export const ContactPageTemplate = ({ title, phone, email, address }) => (
  <div className="contact">
    <section>
      <div className="wide">
        <div className="title">
          <h5>Get in touch</h5>
          <h2>Let's work together</h2>
        </div>

        <FormSimpleAjax />

        <div className="flex half">
          <div className="map">
            <GoogleMap />
          </div>

          <div>
            {!!address && (
              <div>
                <h5>Office</h5>
                <p>{address}</p>
                <br />
              </div>
            )}

            {!!phone && (
              <div>
                <h5>Phone</h5>
                <a href={`tel:${phone}`}>
                  <p>{phone}</p>
                </a>
                <br />
              </div>
            )}

            {!!email && (
              <div>
                <h5>Email</h5>
                <a href={`mailto:${email}`}>
                  <p>{email}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  </div>
)

const ContactPage = ({ data: { page, globalSettings } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate
      {...page.frontmatter}
      {...globalSettings}
      body={page.html}
    />
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

    globalSettings: settingsYaml {
      phone
      address
      email
    }
  }
`
