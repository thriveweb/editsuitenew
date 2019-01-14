import React from 'react'
import { graphql } from 'gatsby'
import FullPage, { ArrowDown, ArrowUp } from '../components/FullPage'

import Layout from '../components/Layout'
import Image from '../components/Image'
import Content from '../components/Content'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import Icons from '../components/Icons'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'

export class AboutPageTemplate extends React.Component {
  render() {
    const {
      title,
      sectionOpener,
      sectionBlurb,
      sectionClients,
      sectionTestimonials,
      icons = [],
      clients = [],
      testimonials,
      isPreview
    } = this.props

    return (
      <FullPage anchors={['promo', 'us', 'about', 'clients', 'testimonials']}>
        <div>
          <div className="section" id="promo">
            <ArrowDown />
            {!!sectionOpener.title && (
              <div className="full open">
                <div className="taCenter">
                  <h1>{sectionOpener.title}</h1>
                  {!!sectionOpener.byline && <h3>{sectionOpener.byline}</h3>}
                </div>
              </div>
            )}
            <div className="gradient" />
            {!!sectionOpener.video && (
              <OpenerVideo src={sectionOpener.video} alt={title} />
            )}
            {!!sectionOpener.image && (
              <OpenerImage src={sectionOpener.image} alt={title} />
            )}
            {!!sectionOpener.mobile && (
              <OpenerMobile src={sectionOpener.mobile} alt={title} />
            )}
          </div>

          <div className="section" id="us">
            <ArrowDown />
            <ArrowUp />
            <Icons icons={icons} />
          </div>

          {!!sectionBlurb && (
            <div className="section dark" id="about">
              <ArrowDown />
              <ArrowUp />
              <div className="wide">
                <SectionTitle
                  title={sectionBlurb.title}
                  subtitle={sectionBlurb.subtitle}
                />
                <div className="flex half">
                  <div>
                    <Image
                      src={sectionBlurb.image}
                      alt={title}
                      className="cover"
                    />
                  </div>
                  <Content src={sectionBlurb.content} />
                </div>
              </div>
            </div>
          )}

          {!isPreview && sectionClients && (
            <div className="section light" id="clients">
              <ArrowDown />
              <ArrowUp />
              <div className="wide">
                <SectionTitle
                  title={sectionClients.title}
                  subtitle={sectionClients.subtitle}
                />
                <ClientsSection clients={clients} />
              </div>
            </div>
          )}

          {!isPreview && sectionTestimonials && (
            <div className="section" id="testimonials">
              <ArrowUp />
              <div className="thin">
                <SectionTitle
                  title={sectionTestimonials.title}
                  subtitle={sectionTestimonials.subtitle}
                />
                <Testimonials testimonials={testimonials} />
              </div>
            </div>
          )}
        </div>
      </FullPage>
    )
  }
}

const AboutPage = ({ data: { page, clients, testimonials } }) => (
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
        ...item.node.frontmatter,
        ...item.node.fields
      }))}
      testimonials={testimonials.edges.map(item => ({
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
        sectionOpener {
          title
          byline
          video
          image
          mobile
        }
        icons {
          oneTitle
          oneDescription
          twoTitle
          twoDescription
          threeTitle
          threeDescription
        }
        sectionBlurb {
          title
          subtitle
          image
          content
        }
        sectionClients {
          title
          subtitle
        }
        sectionTestimonials {
          title
          subtitle
        }
      }
    }

    clients: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/clients/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            logo
          }
        }
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            order
            title
            company
            content
          }
        }
      }
    }
  }
`
