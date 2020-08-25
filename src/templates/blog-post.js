import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { useSpring, animated } from 'react-spring'
import { TRANSITION_DELAY_IN_MS } from '../components/Link'

function TransitionContent({ transition, style, children }) {
  const [toggle, set] = React.useState(true)
  const { opacity } = useSpring({
    opacity: toggle ? 1 : 0,
    from: { opacity: 0 },
  })
  console.log({transition})
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])

  return (
    <animated.div style={{
      opacity,
      ...style,
    }}>
      {children}
    </animated.div>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <TransitionState>
          {({ transitionStatus }) => (
            <TransitionContent transition={transitionStatus} style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(26),
              gridColumn: '1/13',
              padding: `0 ${rhythm(3 / 4)}`,
            }}>
              <>
                <h1>{post.frontmatter.title}</h1>
                <p
                  style={{
                    ...scale(-1 / 5),
                    display: `block`,
                    marginBottom: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  {post.frontmatter.date}
                </p>
                <MDXRenderer>{post.body}</MDXRenderer>
                <hr
                  style={{
                    marginBottom: rhythm(1),
                  }}
                />

                <ul
                  style={{
                    display: `flex`,
                    flexDirection: 'column',
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  <li>
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        &larr; {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li style={{ textAlign: 'right' }}>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} &rarr;
                      </Link>
                    )}
                  </li>
                </ul>
              </>
            </TransitionContent>
          )}
        </TransitionState>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`
