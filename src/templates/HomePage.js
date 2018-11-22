import React from 'react'
import { graphql, Link } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export const HomePageTemplate = ({
  title,
  openerText,
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

              {!!intro && (
                <div className="section">
                  <div className="thin flex">
                    <SectionTitle
                      title="We are creators"
                      subtitle="What we do"
                    />
                    <div>
                      <p>{intro.description}</p>
                      <Link to={intro.buttonLink} className="button">
                        {intro.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {!!projectCategories && (
                <div className="section dark">
                  <div className="wide">
                    <SectionTitle
                      title="What we can offer"
                      subtitle="Our specialities"
                    />
                    <ProjectCategories categories={projectCategories} />
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

              {!!contact && (
                <div className="section dark">
                  <div className="wide">
                    <SectionTitle
                      title="Let's work together"
                      subtitle="Get in touch"
                    />
                    <ContactInfo contact={contact} />
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

const HomePage = ({
  data: { page, clients, testimonials, projectCategories, globalSettings }
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
      testimonials={testimonials.edges.map(item => ({
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
        openerText
        openerVideo
        openerImage
        intro {
          description
          buttonText
          buttonLink
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
