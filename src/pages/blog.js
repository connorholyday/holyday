import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Blog from '../components/Blog'

class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location}>
        <SEO
          title="Connor's Blog"
          keywords={[`blog`, `webgl`, `threejs`, `javascript`, `react`]}
        />
        <TransitionState>
          {({ transitionStatus }) => (
            <Blog posts={posts} transition={transitionStatus} />
          )}
        </TransitionState>
      </Layout>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
