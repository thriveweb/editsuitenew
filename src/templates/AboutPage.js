import React from 'react'
import { graphql } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

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

export const AboutPageTemplate = ({
  title,
  sectionOpener,
  sectionBlurb,
  sectionClients,
  sectionTestimonials,
  icons = [],
  clients = [],
  testimonials,
  isPreview
}) => {
  let options = {
    licenceKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors: ['one', 'two', 'three', 'four', 'five'],
    responsiveWidth: 900,
    verticalAlign: true,
    navigation: false
  }

  return (
    <ReactFullpage
      {...options}
      render={({ state, fullpageApi }) => {
        return (
          <div>
            <ReactFullpage.Wrapper>
              <div className="section">
                <div
                  className="arrow-down"
                  onClick={() => fullpageApi.moveSectionDown()}
                />
                {!!sectionOpener.video && (
                  <OpenerVideo
                    src={sectionOpener.video}
                    title={sectionOpener.title}
                    alt={title}
                  />
                )}
                {!!sectionOpener.image && (
                  <OpenerImage
                    src={sectionOpener.image}
                    title={sectionOpener.title}
                    alt={title}
                  />
                )}
                {!!sectionOpener.mobile && (
                  <OpenerMobile
                    src={sectionOpener.mobile}
                    title={sectionOpener.title}
                    alt={title}
                  />
                )}
              </div>

              {!!icons && (
                <div className="section">
                  <div
                    className="arrow-down"
                    onClick={() => fullpageApi.moveSectionDown()}
                  />
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <Icons icons={icons} />
                </div>
              )}

              {!!sectionBlurb && (
                <div className="section dark">
                  <div
                    className="arrow-down"
                    onClick={() => fullpageApi.moveSectionDown()}
                  />
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
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
                <div className="section light">
                  <div
                    className="arrow-down"
                    onClick={() => fullpageApi.moveSectionDown()}
                  />
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
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
                <div className="section">
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <div className="thin">
                    <SectionTitle
                      title={sectionTestimonials.title}
                      subtitle={sectionTestimonials.subtitle}
                    />
                    <Testimonials testimonials={testimonials} />
                  </div>
                </div>
              )}
            </ReactFullpage.Wrapper>
          </div>
        )
      }}
    />
  )
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
        ...item.node.frontmatter
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
          video
          image
          mobile
        }
        icons {
          title
          icon
          description
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
          frontmatter {
            title
            logo
            link
          }
        }
      }
    }

    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            content
          }
        }
      }
    }
  }
`
