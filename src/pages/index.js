import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Home from '../components/Home'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const HomePage = ({ location, data }) => {
  const { title, social } = data.site.siteMetadata
  const images = new Map();

  data.images.edges.forEach(item => {
    images.set(item.node.name, item.node.childImageSharp.fluid);
  });

  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={[`blog`, `webgl`, `threejs`, `javascript`, `react`]}
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <Home social={social} images={images} transition={transitionStatus} />
        )}
      </TransitionState>
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
    images: allFile(filter:{
      relativeDirectory:{
        regex: "/work/"
      }
    }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
