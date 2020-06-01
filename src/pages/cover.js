import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./cover.css"
import homelogo from "../../content/assets/homelogo.svg"

class Cover extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Cover" />

        <div class="cover_logo">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <img src={homelogo} alt="Logo" />
          </Link>
        </div>

        <br />

        {/* <iframe
          class="video"
          src="https://www.youtube.com/embed/guMCTWMD1iE"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          // allowfullscreen
          title="mincho"
        ></iframe> */}
        <iframe
          class="video"
          src="https://www.youtube.com/embed/um0GNZoTPqk?list=PLcTVu2Bx02SsgTiXno8X9zHcn2aasO2yY?rel=0;autoplay=1;"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="taeyeon"
          // allowfullscreen
        ></iframe>
      </Layout>
    )
  }
}

export default Cover

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
