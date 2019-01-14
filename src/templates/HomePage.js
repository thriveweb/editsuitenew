import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import ClientsSection from '../components/ClientsSection'
import Testimonials from '../components/Testimonials'
import ContactInfo from '../components/ContactInfo'

export class HomePageTemplate extends React.Component {
  state = {
    scrolling: false,
    visibleSection: 0
  }

  componentDidMount() {
    this.scrollEvent()
    window.addEventListener('wheel', this.handleScroll)
    setTimeout(() => {
      this.setState({
        visibleSection: Math.floor(window.scrollY / window.innerHeight)
      })
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll)
    window.onwheel = window.onmousewheel = document.onmousewheel = null
  }

  stickyScroll = e => {
    e = e || window.event
    if (e.preventDefault) e.preventDefault()
    e.returnValue = false

    if (!this.state.scrolling) {
      this.setState({ scrolling: true })

      if (e.wheelDelta > 0 && this.state.visibleSection > 0) {
        this.setState({ visibleSection: this.state.visibleSection - 1 })
      } else if (e.wheelDelta < 0 && this.state.visibleSection < 5) {
        this.setState({ visibleSection: this.state.visibleSection + 1 })
      }

      window.scrollTo(0, window.innerHeight * this.state.visibleSection)

      setTimeout(() => {
        this.setState({ scrolling: false })
      }, 1250)
    }
  }

  scrollEvent = () => {
    if (window.innerWidth >= 900) {
      window.onwheel = this.stickyScroll
      window.onmousewheel = document.onmousewheel = this.stickyScroll
    } else {
      window.onwheel = window.onmousewheel = document.onmousewheel = null
    }
  }

  handleScroll = () => {
    this.scrollEvent()
  }

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
      <div>
        <div className="section" id="promo">
          <a href="#about" className="arrow-down">
            {''}
          </a>
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
              poster={sectionOpener.videoPoster}
              alt={title}
            />
          )}
          {!!sectionOpener.image && (
            <OpenerImage src={sectionOpener.image} alt={title} />
          )}
          {!!sectionOpener.mobile && (
            <OpenerMobile src={sectionOpener.mobile} alt={title} />
          )}
        </div>

        {!!sectionIntro && (
          <div className="section" id="about">
            <a href="#specialities" className="arrow-down">
              {''}
            </a>
            <a href="#promo" className="arrow-up">
              {''}
            </a>
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
          <div className="section dark" id="specialities">
            <a href="#collaborations" className="arrow-down">
              {''}
            </a>
            <a href="#about" className="arrow-up">
              {''}
            </a>
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
          <div className="section light" id="collaborations">
            <a href="#testimonials" className="arrow-down">
              {''}
            </a>
            <a href="#specialities" className="arrow-up">
              {''}
            </a>
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
          <div className="section" id="testimonials">
            <a href="#contact" className="arrow-down">
              {''}
            </a>
            <a href="#collaborations" className="arrow-up">
              {''}
            </a>
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
          <div className="section dark" id="contact">
            <a href="#testimonials" className="arrow-up">
              {''}
            </a>
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
          videoPoster
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
