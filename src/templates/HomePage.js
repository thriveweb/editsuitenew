import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import FullPage, { ArrowDown, ArrowUp } from '../components/FullPage'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export class HomePageTemplate extends Component {
  render() {
    const {
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
    } = this.props
    return (
      <FullPage
        anchors={[
          'promo',
          'about',
          'specialities',
          'collaborations',
          'testimonials',
          'contact'
        ]}
      >
        <div>
          <div className="section" dataanchor="promo">
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
              <OpenerVideo
                src={sectionOpener.video}
                poster={sectionOpener.image}
                alt={title}
              />
            )}
            {!!sectionOpener.image && !sectionOpener.video && (
              <OpenerImage src={sectionOpener.image} alt={title} />
            )}
            {!!sectionOpener.mobileImage && (
              <OpenerMobile src={sectionOpener.mobileImage} alt={title} />
            )}
          </div>

          {!!sectionIntro && (
            <div className="section" dataanchor="about">
              <ArrowDown />
              <ArrowUp />
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
            <div className="section dark" dataanchor="specialities">
              <ArrowDown />
              <ArrowUp />
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
            <div className="section light" dataanchor="collaborations">
              <ArrowDown />
              <ArrowUp />
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
            <div className="section" dataanchor="testimonials">
              <ArrowDown />
              <ArrowUp />
              <div className="thin">
                <SectionTitle
                  title={sectionTestimonials.title}
                  subtitle={sectionTestimonials.subtitle}
                />
                {!!testimonials && <Testimonials testimonials={testimonials} />}
              </div>
            </div>
          )}

          {!!sectionContact && (
            <div className="section dark" dataanchor="contact">
              <ArrowUp />
              <div className="wide">
                <SectionTitle
                  title={sectionContact.title}
                  subtitle={sectionContact.subtitle}
                />
                <ContactInfo contact={contact} />
              </div>
            </div>
          )}
        </div>
      </FullPage>
    )
  }
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
          mobileImage
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
            slug
            sectionOpener {
              image
              mobileImage
            }
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
