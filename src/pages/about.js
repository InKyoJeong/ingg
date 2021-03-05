import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./about.scss"

class AboutPage extends React.Component {
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
        <table>
          <h1 class="about-activities">Activity</h1>
          <tr>
            <td class="about-activities__period">19.03 ~ 19.12</td>
            <td>
              LIKE LION
              {/* <a
                href="https://github.com/InKyoJeong/Resume/blob/master/Certificate/cer.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Completion
              </a> */}
            </td>
          </tr>
          {/* <tr>
            <td class="about-activities__period">20.09 ~ 20.11</td>
            <td>Double Slash</td>
          </tr> */}
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
