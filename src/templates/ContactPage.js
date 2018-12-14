import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import FormSimpleAjax from '../components/FormSimpleAjax'
import ContactInfo from '../components/ContactInfo'

import './ContactPage.css'
import '../components/Footer.css'

export const ContactPageTemplate = ({ title, contact }) => (
  <div>
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

    <div className="footer">
      <div className="flex">
        <p>
          © Copyright {new Date().getFullYear()} The Edit Suite. All Rights
          Reserved.
        </p>

        <p>
          Crafted by{' '}
          <a
            href="https://thriveweb.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thrive Digital
          </a>
        </p>
      </div>
    </div>
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
