import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import About from '../components/About'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const AboutPage = ({ location, data }) => {
  const { title } = data.site.siteMetadata

  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={[`blog`, `webgl`, `threejs`, `javascript`, `react`]}
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <About transition={transitionStatus} profile={data.profile.childImageSharp.fluid} />
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
      }
    }
    profile: file(relativePath: { regex: "/profile/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, maxHeight: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
