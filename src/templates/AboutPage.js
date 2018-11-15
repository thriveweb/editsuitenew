import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Anchor from '../components/Anchor'
import Image from '../components/Image'
import Content from '../components/Content'
import SectionTitle from '../components/SectionTitle'
import Icons from '../components/Icons'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'

export const AboutPageTemplate = ({
  title,
  opener,
  icons = [],
  blurb,
  clients,
  testimonials,
  isPreview
}) => (
  <div className="scroll-jack">
    {!!opener && (
      <section id="one">
        <Anchor down to="two" />
        <div className="opener relative">
          <h1>{title}</h1>
          <div className="gradient" />
          <Image background resolutions="large" src={opener} alt={title} />
        </div>
      </section>
    )}

    {!!icons && (
      <section id="two">
        <Anchor up to="one" /> <Anchor down to="three" />
        <Icons icons={icons} />
      </section>
    )}

    {!!blurb && (
      <section id="three" className="light">
        <Anchor up to="two" /> <Anchor down to="four" />
        <div className="wide">
          <SectionTitle
            title="More than just a pretty face"
            subtitle="Our story"
          />
          <div className="flex half">
            <div>
              <Image src={blurb.image} alt={title} className="cover" />
            </div>
            <Content src={blurb.content} />
          </div>
        </div>
      </section>
    )}

    {!!clients && (
      <section id="four">
        <Anchor up to="three" /> <Anchor down to="five" />
        <div className="wide">
          <SectionTitle title="Who we work with" subtitle="Our clients" />
          <ClientsSection clients={clients} />
        </div>
      </section>
    )}

    {!isPreview &&
      !!testimonials && (
        <section id="five" className="dark">
          <Anchor up to="four" />
          <div className="thin">
            <SectionTitle
              title="Don't take our word for it"
              subtitle="Testimonials"
            />
            <Testimonials testimonials={testimonials} />
          </div>
        </section>
      )}
  </div>
)

const AboutPage = ({ data: { page, clients } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      clients={clients.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
    />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        opener
        icons {
          title
          icon
          description
        }
        blurb {
          image
          content
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
  }
`
