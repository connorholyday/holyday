import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import About from '../components/About'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const AboutPage = ({ location, data }) => {
  const { title, social } = data.site.siteMetadata

  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={[`blog`, `webgl`, `threejs`, `javascript`, `react`]}
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <About social={social} transition={transitionStatus} />
        )}
      </TransitionState>
    </Layout>
  )
}

export default AboutPage

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
