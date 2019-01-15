import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import FormSimpleAjax from '../components/FormSimpleAjax'
import ContactInfo from '../components/ContactInfo'
import Footer from '../components/Footer'

import './ContactPage.css'
import '../components/Footer.css'

export const ContactPageTemplate = ({ sectionContact, contact }) => (
  <Fragment>
    <div className="contact full">
      <div className="wide">
        {!!sectionContact && (
          <SectionTitle
            title={sectionContact.title}
            subtitle={sectionContact.subtitle}
          />
        )}

        <FormSimpleAjax />
        <ContactInfo contact={contact} />
      </div>
    </div>

    <Footer />
  </Fragment>
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
        sectionContact {
          title
          subtitle
        }
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
