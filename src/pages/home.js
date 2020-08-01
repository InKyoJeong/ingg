import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./home.css"
import homelogo from "../../content/assets/homelogo.svg"
// import christmas from "../../content/assets/christmas.svg"

class Home extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Home" />
        {/* <h2 class="cover_christmas">🎄Merry Christmas🎄</h2> */}
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
            {/* <img src={christmas} alt="Logo" /> */}
          </Link>
        </div>

        <br />
        <iframe
          // width="560"
          // height="315"
          class="video"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02SvLHXkmcxiI74jHYpywCzpO"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="playlist"
        ></iframe>
      </Layout>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
