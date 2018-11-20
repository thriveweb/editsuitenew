import React from 'react'
import { graphql, Link } from 'gatsby'
import { SectionsContainer, Section } from 'react-fullpage'

import Layout from '../components/Layout'
import Anchor from '../components/Anchor'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export const HomePageTemplate = ({
  title,
  openerImage,
  openerVideo,
  intro,
  projectCategories = [],
  clients,
  testimonials,
  contact,
  isPreview
}) => {
  let options = {
    licenceKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors: ['one', 'two', 'three', 'four', 'five', 'six'],
    responsiveWidth: 900,
    verticalAlign: true,
    navigation: false
  }

  return (
    <SectionsContainer
      {...options}
      scrollBar={window && window.innerWidth < 700}
    >
      <Section>
        <Anchor down to="two" />
        {!!openerVideo && <OpenerVideo src={openerVideo} title={title} />}
        {!!openerImage && <OpenerImage src={openerImage} title={title} />}
      </Section>

      {!!intro && (
        <Section>
          <Anchor up to="one" /> <Anchor down to="three" />
          <div className="thin flex">
            <SectionTitle title="We are creators" subtitle="What we do" />
            <div>
              <p>{intro.description}</p>
              <Link to={intro.buttonLink} className="button">
                {intro.buttonText}
              </Link>
            </div>
          </div>
        </Section>
      )}

      {!!projectCategories.length && (
        <Section className="light">
          <Anchor up to="two" /> <Anchor down to="four" />
          <div className="wide">
            <SectionTitle
              title="What we can offer"
              subtitle="Our specialities"
            />
            <ProjectCategories categories={projectCategories} />
          </div>
        </Section>
      )}

      {!!clients && (
        <Section className="dark">
          <Anchor up to="three" /> <Anchor down to="five" />
          <div className="wide">
            <SectionTitle title="Who we work with" subtitle="Our clients" />
            <ClientsSection clients={clients} />
          </div>
        </Section>
      )}

      {!isPreview &&
        !!testimonials && (
          <Section>
            <Anchor up to="four" /> <Anchor down to="six" />
            <div className="thin">
              <SectionTitle
                title="Don't take our word for it"
                subtitle="Testimonials"
              />
              <Testimonials testimonials={testimonials} />
            </div>
          </Section>
        )}

      <Section className="dark">
        <Anchor up to="five" />
        <div className="wide">
          <SectionTitle title="Let's work together" subtitle="Get in touch" />
          <ContactInfo contact={contact} />
        </div>
      </Section>
    </SectionsContainer>
  )

  const HomePage = ({
    data: { page, clients, projectCategories, globalSettings }
  }) => (
    <Layout meta={page.frontmatter.meta || false}>
      <HomePageTemplate
        {...page}
        {...page.frontmatter}
        {...globalSettings}
        body={page.html}
        clients={clients.edges.map(item => ({
          ...item.node,
          ...item.node.frontmatter
        }))}
        projectCategories={projectCategories.edges.map(post => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
      />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        openerVideo
        openerImage
        intro {
          description
          buttonText
          buttonLink
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

    projectCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projectCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            order
            preview
            slug
          }
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
