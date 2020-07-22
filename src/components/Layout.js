import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

function Layout({ location, children }) {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => {
        const { title, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gridGap: rhythm(1),
              overflowX: 'hidden',
            }}
          >
            <header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: rhythm(1.5),
                padding: `${rhythm(1.5)} 0`,
                gridColumn: '2/12',
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
              <nav>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                }}>
                  <li style={{ listStyleType: 'none', margin: `0 ${rhythm(0.5)}` }}>
                    <Link
                      style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                      }}
                      to={`/work`}>Work</Link>
                  </li>
                  <li style={{ listStyleType: 'none', margin: `0 ${rhythm(0.5)}` }}>
                    <Link
                      style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                      }}
                      to={`/blog`}>Blog</Link>
                  </li>
                  <li style={{ listStyleType: 'none', margin: `0 0 0 ${rhythm(0.5)}` }}>
                    <Link
                      style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                      }}
                      to={`/lab`}>Lab</Link>
                  </li>
                </ul>
              </nav>
            </header>
            {children}
            <footer
              style={{
                display: 'flex',
                marginTop: rhythm(1.5),
                padding: `${rhythm(1.5)} 0`,
                gridColumn: '2/12',
              }}
            >
              <p style={{ margin: 0, marginRight: 'auto' }}>&copy; {new Date().getFullYear()}</p>
              <a href={`https://twitter.com/${social.twitter}`}>twitter</a> ﹒{' '}
              <a href={`https://github.com/${social.github}`}>github</a> ﹒{' '}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
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
