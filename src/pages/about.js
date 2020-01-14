import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About Me" />
        <h1>정인교 (Jeong InKyo)</h1>
        <br />
        <h2>About Me</h2>
        <p>Likelion 7th</p>
        <h2>Contact</h2>
        <p>viapolar@likelion.org</p>
        <h2>Project</h2>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
