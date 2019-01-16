import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'
import './globalStyles.css'

import Meta from './Meta'
import Nav from './Nav'

export default class Layout extends React.Component {
  state = {
    display: 'none',
    progress: 0,
    hideProgress: 'block'
  }
  UNSAFE_componentWillMount() {
    const p = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 })
      if (this.state.progress === 10) {
        clearInterval(p)
        setTimeout(() => {
          this.setState({ hideProgress: 'none' })
        }, 100)
      }
    }, 100)
    setTimeout(() => {
      this.setState({ display: 'block' })
    }, 1000)
  }

  render() {
    const { children, meta, title } = this.props,
      style = { display: this.state.display },
      style2 = {
        display: this.state.hideProgress
      }

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
                <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.css"
                />
                <script src="//code.jquery.com/jquery-3.3.1.min.js" />
                <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.js" />
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

              <progress
                className="pageLoad"
                value={this.state.progress}
                max="10"
                style={style2}
              />

              <div style={style}>{children}</div>

              {/* <Footer /> */}
            </Fragment>
          )
        }}
      />
    )
  }
}
