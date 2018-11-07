import React from 'react'
import { graphql } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

// import PageHeader from '../components/PageHeader'
// import Content from '../components/Content'
import Layout from '../components/Layout'
import Image from '../components/Image'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title }) => {
  let options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    scrollBar: false,
    navigation: false,
    verticalAlign: false,
    controlArrows: true
  }

  return (
    <SectionsContainer {...options}>
      <Section className="opener relative">
        <div className="gradient" />
        <Image background src="images/home.jpg" alt={title} />
      </Section>
      <Section>Page 2</Section>
      <Section>Page 3</Section>
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
        subtitle
        featuredImage
        accordion {
          title
          content
        }
      }
    }
  }
`
