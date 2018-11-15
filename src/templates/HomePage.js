import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Anchor from '../components/Anchor'
import Image from '../components/Image'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export const HomePageTemplate = ({
  title,
  opener,
  intro,
  projectCategories = [],
  clients,
  testimonials,
  isPreview,
  phone,
  email,
  address
}) => (
  <div className="home">
    <section id="one">
      <Anchor down to="two" />
      <div className="opener relative">
        <div className="gradient" />
        <Image background resolutions="large" src={opener} alt={title} />
      </div>
    </section>

    {!!intro && (
      <section id="two">
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
      </section>
    )}

    {!!projectCategories.length && (
      <section id="three" className="light">
        <Anchor up to="two" /> <Anchor down to="four" />
        <div className="wide">
          <SectionTitle title="What we can offer" subtitle="Our specialities" />
          <ProjectCategories categories={projectCategories} />
        </div>
      </section>
    )}

    {!!clients && (
      <section id="four" className="dark">
        <Anchor up to="three" /> <Anchor down to="five" />
        <div className="wide">
          <SectionTitle title="Who we work with" subtitle="Our clients" />
          <ClientsSection clients={clients} />
        </div>
      </section>
    )}

    {!isPreview &&
      !!testimonials && (
        <section id="five">
          <Anchor up to="four" /> <Anchor down to="six" />
          <div className="thin">
            <SectionTitle
              title="Don't take our word for it"
              subtitle="Testimonials"
            />
            <Testimonials testimonials={testimonials} />
          </div>
        </section>
      )}

    <section id="six" className="dark">
      <Anchor up to="five" />
      <div className="wide">
        <SectionTitle title="Let's work together" subtitle="Get in touch" />
        <ContactInfo address={address} phone={phone} email={email} />
      </div>
    </section>
  </div>
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

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        opener
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
      phone
      address
      email
    }
  }
`
