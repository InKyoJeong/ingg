import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Snowflake from "../components/snowflake";
import HomeLogo from "../components/homelogo";
import "./home.scss";

class Home extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Home" />
        <HomeLogo />
        <Snowflake />

        <br />
        <iframe
          className="video"
          title="playlist"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02SvLHXkmcxiI74jHYpywCzpO"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Layout>
    );
  }
}

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
