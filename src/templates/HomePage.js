import React from 'react'
import { graphql, Link } from 'gatsby'
import ReactFullpage from '@fullpage/react-fullpage'

import Layout from '../components/Layout'
import HomePageVideo from '../components/HomePageVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export const HomePageTemplate = ({
  title,
  sectionOpener,
  sectionIntro,
  sectionProjects,
  sectionClients,
  sectionTestimonials,
  sectionContact,
  projectCategories = [],
  clients,
  testimonials,
  contact
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
                {!!sectionOpener.title && (
                  <div className="full open">
                    <div className="taCenter">
                      <h1>{sectionOpener.title}</h1>
                      {!!sectionOpener.byline && (
                        <h3>{sectionOpener.byline}</h3>
                      )}
                    </div>
                  </div>
                )}
                <div className="gradient" />
                {!!sectionOpener.video && (
                  <HomePageVideo src={sectionOpener.video} alt={title} />
                )}
                {!!sectionOpener.image && (
                  <OpenerImage src={sectionOpener.image} alt={title} />
                )}
                {!!sectionOpener.mobile && (
                  <OpenerMobile src={sectionOpener.mobile} alt={title} />
                )}
              </div>

              {!!sectionIntro && (
                <div className="section">
                  <div
                    className="arrow-down"
                    onClick={() => fullpageApi.moveSectionDown()}
                  />
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <div className="thin flex">
                    <SectionTitle
                      title={sectionIntro.title}
                      subtitle={sectionIntro.subtitle}
                    />
                    <div>
                      <p>{sectionIntro.description}</p>
                      <Link to={sectionIntro.buttonLink} className="button">
                        {sectionIntro.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {!!sectionProjects && (
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
                      title={sectionProjects.title}
                      subtitle={sectionProjects.subtitle}
                    />
                    {!!projectCategories && (
                      <ProjectCategories categories={projectCategories} />
                    )}
                  </div>
                </div>
              )}

              {!!sectionClients && (
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
                    {!!clients && <ClientsSection clients={clients} />}
                  </div>
                </div>
              )}

              {!!sectionTestimonials && (
                <div className="section">
                  <div
                    className="arrow-down"
                    onClick={() => fullpageApi.moveSectionDown()}
                  />
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <div className="thin">
                    <SectionTitle
                      title={sectionTestimonials.title}
                      subtitle={sectionTestimonials.subtitle}
                    />
                    {!!testimonials && (
                      <Testimonials testimonials={testimonials} />
                    )}
                  </div>
                </div>
              )}

              {!!sectionContact && (
                <div className="section dark">
                  <div
                    className="arrow-up"
                    onClick={() => fullpageApi.moveSectionUp()}
                  />
                  <div className="wide">
                    <SectionTitle
                      title={sectionContact.title}
                      subtitle={sectionContact.subtitle}
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
        ...item.node.frontmatter,
        ...item.node.fields
      }))}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter,
        ...item.node.fields
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
        sectionOpener {
          title
          byline
          video
          image
          mobile
        }
        sectionIntro {
          title
          subtitle
          description
          buttonText
          buttonLink
        }
        sectionProjects {
          title
          subtitle
        }
        sectionClients {
          title
          subtitle
        }
        sectionTestimonials {
          title
          subtitle
        }
        sectionContact {
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
