import React from 'react'
import Layout from '../../components/Layout'
import Swirls from '../../components/Swirls'

class SwirlPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} inverse>
        <Swirls />
      </Layout>
    )
  }
}

export default SwirlPage
