import React from 'react'
import { Link, graphql } from 'gatsby'

import Home from '../components/Home'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const HomePage = ({ location, data }) => {
  const { title, social } = data.site.siteMetadata

  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={[`blog`, `webgl`, `threejs`, `javascript`, `react`]}
      />
      <Home title={title} social={social} />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
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
