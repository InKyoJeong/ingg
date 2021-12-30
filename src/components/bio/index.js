/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Image from "gatsby-image";
import "./styles.scss";
import { rhythm } from "../../utils/typography";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faGithub);

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(0.5),
      }}
    >
      <div className="circle"></div>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1.6 / 2),
          marginBottom: 10,
          minWidth: 80,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        className="avatar"
      />

      <div className="author-profile">
        <span className="author-name-prefix">Written by</span>
        <Link to={"/about"} className="author-name-content">
          <span>{author}</span>
        </Link>
        <br />
        <div className="author-introduce">Frond-End Developer</div>
        <div className="author-sns">
          <a href="https://github.com/inkyojeong" style={{ boxShadow: `none` }}>
            <FontAwesomeIcon
              icon={["fab", "github"]}
              className="author-sns__icon"
            />
            Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bio;
