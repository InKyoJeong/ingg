import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import "./about.scss"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About Me" />
        <h1 className="about-myname">
          <span>정인교 (InKyo Jeong)</span>
        </h1>
        <hr className="about-myname__hr" />
        <table>
          <tr>
            <td>Blog</td>
            <td>
              <a href="https://ingg.dev" className="about-link">
                https://ingg.dev
              </a>
            </td>
          </tr>
          <tr>
            <td>Github</td>
            <td>
              <a
                href="https://github.com/InKyoJeong"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                https://github.com/InKyoJeong
              </a>
            </td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>inkyo.dev@gmail.com</td>
          </tr>
        </table>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
