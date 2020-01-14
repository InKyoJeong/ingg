import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./about.css"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About Me" />
        <h1 class="myname">
          <span>정인교 (Jeong InKyo)</span>
        </h1>
        <p>
          <span role="img" aria-label="study">
            👨🏻‍💻
          </span>
          Junior
          <span role="img" aria-label="study">
            👨🏻‍💻
          </span>
          / HTML,CSS / Javascript / React / Git
        </p>
        <br />
        <h2>Now</h2>
        <p>LikeLion 7th</p>
        <h2>Contact</h2>
        <p class="email-1">inkyo.dev@gmail.com</p>
        <p class="email-2">viapolar@likelion.org</p>
        <h2>Project</h2>
        <p>-</p>
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
