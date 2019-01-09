import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import OpenerVideo from '../components/OpenerVideo'
import OpenerImage from '../components/OpenerImage'
import OpenerMobile from '../components/OpenerMobile'
import SectionTitle from '../components/SectionTitle'
import ProjectCategories from '../components/ProjectCategories'
import Testimonials from '../components/Testimonials'

export class ProjectPageTemplate extends React.Component {
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
      } else if (e.wheelDelta < 0 && this.state.visibleSection < 2) {
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
      sectionProjects,
      projectCategories = [],
      sectionTestimonials,
      testimonials
    } = this.props

    return (
      <div>
        <div className="section" id="promo">
          <a href="#specialities" className="arrow-down">
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
            <OpenerVideo src={sectionOpener.video} alt={title} />
          )}
          {!!sectionOpener.image && (
            <OpenerImage src={sectionOpener.image} alt={title} />
          )}
          {!!sectionOpener.mobile && (
            <OpenerMobile src={sectionOpener.mobile} alt={title} />
          )}
        </div>

        {!!projectCategories && (
          <div className="section" id="specialities">
            <a href="#testimonials" className="arrow-down">
              {''}
            </a>
            <a href="#promo" className="arrow-up">
              {''}
            </a>
            <div className="wide">
              <SectionTitle
                title={sectionProjects.title}
                subtitle={sectionProjects.subtitle}
              />
              <ProjectCategories categories={projectCategories} />
            </div>
          </div>
        )}

        {!!sectionTestimonials && (
          <div className="section" id="testimonials">
            <a href="#specialities" className="arrow-up">
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
      </div>
    )
  }
}

const ProjectPage = ({ data: { page, testimonials, projectCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      projectCategories={projectCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      testimonials={testimonials.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter
      }))}
    />
  </Layout>
)

export default ProjectPage

export const pageQuery = graphql`
  query ProjectPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        sectionOpener {
          title
          byline
          video
          image
          mobile
        }
        sectionProjects {
          title
          subtitle
        }
        sectionTestimonials {
          title
          subtitle
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
  }
`
