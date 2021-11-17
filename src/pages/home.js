import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import Snow from "../components/Snow/snow"
import homelogo from "../../content/assets/homelogo.svg"
import "./home.scss"
// import christmas from "../../content/assets/christmas.svg"

class Home extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Home" />
        {/* <h2 class="cover_christmas">🎄Merry Christmas🎄</h2> */}
        <div className="cover_logo">
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

        <Snow />

        <br />

        {/* 재생목록 */}
        <iframe
          className="video"
          title="playlist"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02SvLHXkmcxiI74jHYpywCzpO"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
