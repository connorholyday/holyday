import React from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'

import NotFound from '../components/NotFound'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const NotFoundPage = ({ location, data }) => {
  return (
    <Layout location={location}>
      <SEO
        title="404: Page Not found"
      />
      <TransitionState>
        {({ transitionStatus }) => (
          <NotFound transition={transitionStatus} />
        )}
      </TransitionState>
    </Layout>
  )
}

export default NotFoundPage
