import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Hero from "../components/HomeHero"
import Posts from "../components/posts"

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
            type
            url
          }
        }
      }
    }
  }
`

const HomePage = ({ location, data }) => (
  <Layout location={location}>
    <Hero />
    <Posts posts={data.allMarkdownRemark.edges} />
  </Layout>
)

export default HomePage
