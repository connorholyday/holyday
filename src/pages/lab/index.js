import React from 'react'
import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import Lab from '../../components/Lab'

const posts = [
  {
    link: '/lab/noise-waves',
    title: 'Noise Waves',
  }
]

class LabPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO
          title="Connor's Lab"
          keywords={[`webgl`, `threejs`, `javascript`, `react`]}
        />
        <TransitionState>
          {({ transitionStatus }) => (
            <Lab posts={posts} transition={transitionStatus} />
          )}
        </TransitionState>
      </Layout>
    )
  }
}

export default LabPage
