import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import Loop from '../../components/Loop'

const LoopPage = ({ location, data }) => {
  const images = new Map();

  data.images.edges.forEach(item => {
    images.set(item.node.name, item.node.publicURL);
  });
  
  return (
    <Layout location={location}>
      <SEO
        title="In search of the perfect loop"
        keywords={[`webgl`, `threejs`, `javascript`, `react`]}
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <Loop
            images={images}
            transition={transitionStatus}
            loading={data.loading.publicUrl}
          />
        )}
      </TransitionState>
    </Layout>
  )
}

export default LoopPage

export const pageQuery = graphql`
  query {
    images: allFile(filter:{
      relativeDirectory:{
        regex: "/loop/"
      }
    }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
    loading: file(relativePath: { regex: "/loading/" }) {
      publicURL
    }
  }
`
