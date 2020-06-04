import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

function Layout({ location, children }) {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => {
        const { title, social } = data.site.siteMetadata
        const rootPath = `${__PATH_PREFIX__}/`
        return (
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: rhythm(1.5),
              }}
            >
              <h1
                style={{
                  ...scale(0.5),
                  marginTop: 0,
                  marginBottom: rhythm(-1),
                }}
              >
                <Link
                  style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `inherit`,
                  }}
                  to={`/`}
                >
                  {title}
                </Link>
              </h1>
              <a
                href={`https://twitter.com/${social.twitter}`}
                style={{
                  color: '#1da1f2',
                  boxShadow: `none`,
                  textDecoration: `none`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                </svg>
              </a>
            </header>
            {children}
            <footer
              style={{
                display: 'flex',
                marginTop: rhythm(2.5),
              }}
            >
              <a href={`https://twitter.com/${social.twitter}`}>twitter</a> ﹒{' '}
              <a href={`https://github.com/${social.github}`}>github</a>{' '}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 'auto' }}
              >
                rss
              </a>
            </footer>
          </div>
        )
      }}
    />
  )
}

const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Layout
