import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'
import './globalStyles.css'

import Meta from './Meta'
import Nav from './Nav'

export default class Layout extends React.Component {
  state = {
    showContent: false,
    progress: 0,
    hideProgress: false
  }

  componentDidMount() {
    let p = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 })
      if (this.state.progress >= 10) {
        this.setState({ hideProgress: true })
        clearInterval(p)
      }
    }, 100)

    setTimeout(() => {
      this.setState({ showContent: true })
    }, 1000)
  }

  render() {
    const { children, meta, title } = this.props

    return (
      <StaticQuery
        query={graphql`
          query IndexLayoutQuery {
            settingsYaml {
              siteTitle
              siteDescription
              headerScripts
              socialMediaCard {
                image
              }
              social {
                facebook
                instagram
                vimeo
                linkedin
              }
            }
          }
        `}
        render={data => {
          const { siteTitle, siteUrl, socialMediaCard, headerScripts, social } =
            data.settingsYaml || {}
          return (
            <Fragment>
              <Helmet
                defaultTitle={siteTitle}
                titleTemplate={`%s | ${siteTitle}`}
              >
                {title}
                <link
                  rel="stylesheet"
                  href="https://use.typekit.net/rdy6jzy.css"
                />
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
                  integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
                  crossorigin="anonymous"
                />
              </Helmet>

              <Meta
                headerScripts={headerScripts}
                absoluteImageUrl={
                  socialMediaCard &&
                  socialMediaCard.image &&
                  siteUrl + socialMediaCard.image
                }
                {...meta}
              />

              <Nav social={social} />

              {!this.state.hideProgress && (
                <progress
                  className="pageLoad"
                  value={this.state.progress}
                  max="10"
                />
              )}

              {this.state.showContent && <div>{children}</div>}

              {/* <Footer /> */}
            </Fragment>
          )
        }}
      />
    )
  }
}
