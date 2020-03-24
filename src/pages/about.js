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
        <h1 class="about-myname">
          <span>정인교 (InKyo Jeong)</span>
        </h1>
        <hr class="about-myname__hr" />
        {/* <h1 class="about-introduce">
          <span>
            Junior,{" "}
            <span role="img" aria-label="study">
              👨🏻‍💻
            </span>
            Dev Log
          </span>
        </h1> */}
        {/* <p> HTML,CSS / Javascript / React / Git</p> */}

        <table>
          <tr>
            <td>Blog</td>
            <td>
              <a href="https://ingg.io" className="about-link">
                https://ingg.io
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
            <td>
              <a href="mailto:inkyo.dev@gmail.com" className="about-contact">
                inkyo.dev@gmail.com
              </a>
            </td>
          </tr>
        </table>
        <table>
          <h1 class="about-activities">Activities</h1>
          <tr>
            <td class="about-activities__period">19.01 ~ 19.12</td>
            <td>
              LikeLion 7th,{" "}
              <a
                href="https://github.com/InKyoJeong/Resume/blob/master/Certificate/cer.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Completion
              </a>
            </td>
          </tr>
        </table>
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
