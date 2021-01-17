import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import Loop from '../../components/Loop'

const LoopPage = ({ location, data }) => {
  const videos = new Map();

  data.videos.edges.forEach(item => {
    videos.set(item.node.name, item.node.publicURL);
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
            videos={videos}
            transition={transitionStatus}
            loading={data.loading.publicURL}
          />
        )}
      </TransitionState>
    </Layout>
  )
}

export default LoopPage

export const pageQuery = graphql`
  query {
    videos: allFile(filter:{
      relativeDirectory:{
        regex: "/loop/"
      }
      relativePath:{
        regex: "/mp4/"
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
