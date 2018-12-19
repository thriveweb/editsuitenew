import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from './Meta'
import Nav from './Nav'
// import Footer from './Footer'

export default ({ children, meta, title }) => {
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
              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/home_video.mp4"
                as="video"
              />
              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/motion_video.mp4"
                as="video"
              />
              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/business_video.mp4"
                as="video"
              />
              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/promos_video.mp4"
                as="video"
              />

              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/events_video.mp4"
                as="video"
              />
              <link
                rel="preload"
                href="https://theeditsuite.netlify.com/images/drone_video.mp4"
                as="video"
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

            <Fragment>{children}</Fragment>

            {/* <Footer /> */}
          </Fragment>
        )
      }}
    />
  )
}
