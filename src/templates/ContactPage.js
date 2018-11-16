import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import FormSimpleAjax from '../components/FormSimpleAjax'
import ContactInfo from '../components/ContactInfo'

import './ContactPage.css'

export const ContactPageTemplate = ({ title, contact }) => (
  <div className="contact">
    <section>
      <div className="wide">
        <SectionTitle title="Let's work together" subtitle="Get in touch" />
        <FormSimpleAjax />
        <ContactInfo contact={contact} />
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
      contact {
        phone
        address
        email
      }
    }
  }
`
