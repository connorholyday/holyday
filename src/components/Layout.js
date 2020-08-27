import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import { TransitionLink as NavLink } from './Link'

function Layout({ location, inverse, children }) {
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
              gridTemplateRows: 'auto 1fr auto',
              gridGap: rhythm(1),
              overflowX: 'hidden',
              minHeight: '100vh',
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
                zIndex: 2,
              }}
            >
              <h1
                style={{
                  ...scale(0.5),
                  marginTop: 0,
                  marginBottom: rhythm(-1),
                }}
              >
                <NavLink
                  style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: inverse ? 'white' : `inherit`,
                  }}
                  to={`/`}
                >
                  {title}
                </NavLink>
              </h1>
              <nav>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                  }}
                >
                  <li
                    style={{
                      listStyleType: 'none',
                      margin: `0 ${rhythm(0.5)}`,
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/about`}>About</NavLink>
                  </li>
                  <li
                    style={{
                      listStyleType: 'none',
                      margin: `0 ${rhythm(0.5)}`,
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/blog`}>Blog</NavLink>
                  </li>
                  <li
                    style={{
                      listStyleType: 'none',
                      margin: `0 0 0 ${rhythm(0.5)}`,
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/lab`}>Lab</NavLink>
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
                color: inverse ? 'white' : `inherit`,
                zIndex: 2,
              }}
            >
              <p style={{ margin: 0, marginRight: 'auto' }}>
                &copy; {new Date().getFullYear()}
              </p>
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
                href={`https://twitter.com/${social.twitter}`}
              >
                twitter
              </a>{' '}
              ﹒{' '}
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
                href={`https://github.com/${social.github}`}
              >
                github
              </a>{' '}
              ﹒{' '}
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
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
