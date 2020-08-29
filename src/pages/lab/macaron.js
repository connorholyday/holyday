import React from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import Layout from '../../components/Layout'
import Macaron from '../../components/Macaron'

class MacaronPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} inverse>
        <TransitionState>
          {({ transitionStatus }) => (
            <Macaron transition={transitionStatus} />
          )}
        </TransitionState>
      </Layout>
    )
  }
}

export default MacaronPage
