import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./home.css"
import homelogo from "../../content/assets/homelogo.svg"
import listlogo from "../../content/assets/listlogo.svg"
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

        <br />

        <iframe
          className="video"
          title="playlist"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02SvLHXkmcxiI74jHYpywCzpO"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="list_logo">
          <a
            href="https://www.youtube.com/playlist?list=PLcTVu2Bx02SvLHXkmcxiI74jHYpywCzpO"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
            }}
          >
            <img src={listlogo} alt="Logo2" />
          </a>
        </div>
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
