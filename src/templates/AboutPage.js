import React from 'react'
import { graphql } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

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
  openerText,
  openerImage,
  openerVideo,
  icons = [],
  blurb,
  clients,
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
                >
                  {''}
                </div>
                {!!openerVideo && (
                  <OpenerVideo
                    src={openerVideo}
                    title={openerText}
                    alt={title}
                  />
                )}
                {!!openerImage && (
                  <OpenerImage
                    src={openerImage}
                    title={openerText}
                    alt={title}
                  />
                )}
              </div>

              {!!icons && (
                <div className="section">
                  <Icons icons={icons} />
                </div>
              )}

              {!!blurb && (
                <div className="section dark">
                  <div className="wide">
                    <SectionTitle
                      title="More than just a pretty face"
                      subtitle="Our story"
                    />
                    <div className="flex half">
                      <div>
                        <Image
                          src={blurb.image}
                          alt={title}
                          className="cover"
                        />
                      </div>
                      <Content src={blurb.content} />
                    </div>
                  </div>
                </div>
              )}

              {!!clients && (
                <div className="section light">
                  <div className="wide">
                    <SectionTitle
                      title="Who we work with"
                      subtitle="Our clients"
                    />
                    <ClientsSection clients={clients} />
                  </div>
                </div>
              )}

              {!!testimonials && (
                <div className="section">
                  <div className="thin">
                    <SectionTitle
                      title="Don't take our word for it"
                      subtitle="Testimonials"
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
        openerText
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
            name
            company
            content
          }
        }
      }
    }
  }
`
