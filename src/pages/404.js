import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query NotFoundPageQuery {
        globalSettings: settingsYaml {
          siteTitle
        }
      }
    `}
    render={data => (
      <Layout>
        <Helmet>
          <title>404 – Page Not Found</title>
        </Helmet>
        <section>
          <div className="four04 thin relative">
            <div className="taCenter">
              <h1>That doesn't exist.</h1>
              <h3>
                Head back <Link to="/">home.</Link>
              </h3>
            </div>
            <Image background src="/images/error.svg" alt="Error 404" />
          </div>
        </section>
      </Layout>
    )}
  />
)
