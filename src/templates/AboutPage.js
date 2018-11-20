import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import Content from '../components/Content'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import Icons from '../components/Icons'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'

export const AboutPageTemplate = ({
  title,
  openerVideo,
  openerImage,
  icons = [],
  blurb,
  clients,
  testimonials,
  isPreview
}) => (
  <div className="scroll-jack">
    <section id="one">
      {!!openerVideo && <OpenerVideo src={openerVideo} title={title} />}
      {!!openerImage && <OpenerImage src={openerImage} title={title} />}
    </section>

    {!!icons && (
      <section id="two">
        <Icons icons={icons} />
      </section>
    )}

    {!!blurb && (
      <section id="three" className="light">
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
        <div className="wide">
          <SectionTitle title="Who we work with" subtitle="Our clients" />
          <ClientsSection clients={clients} />
        </div>
      </section>
    )}

    {!isPreview &&
      !!testimonials && (
        <section id="five" className="dark">
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
        openerVideo
        openerImage
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
