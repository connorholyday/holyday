import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import Lab from '../../components/Lab'

const posts = [
  {
    slug: 'ballpit',
    link: '/lab/ballpit',
    title: 'Ballpit',
  },
  {
    slug: 'loops',
    link: '/lab/loops',
    title: 'Loops',
  },
  {
    slug: 'swirls',
    link: '/lab/swirls',
    title: 'Swirls',
  },
  {
    slug: 'noise-waves',
    link: '/lab/noise-waves',
    title: 'Noise Waves',
  },
  {
    slug: 'macarons',
    link: '/lab/macarons',
    title: 'Macarons',
  },
]

const LabPage = ({ location, data }) => {
  const images = new Map();

  data.images.edges.forEach(item => {
    images.set(item.node.name, item.node.childImageSharp.fluid);
  });
  
  return (
    <Layout location={location}>
      <SEO
        title="Connor's Lab"
        keywords={[`webgl`, `threejs`, `javascript`, `react`]}
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <Lab posts={posts} images={images} transition={transitionStatus} />
        )}
      </TransitionState>
    </Layout>
  )
}

export default LabPage

export const pageQuery = graphql`
  query {
    images: allFile(filter:{
      relativeDirectory:{
        regex: "/lab/"
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
