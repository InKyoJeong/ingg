import React, { useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { DarkModeStateContext } from "../../context/DarkModeProvider";
import "./bio.scss";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `);

  const isDarkMode = useContext(DarkModeStateContext);
  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <div className={`bio ${isDarkMode ? "dark" : "light"}`}>
      <div className="bio-circle" />
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../../images/profile-pic.jpg"
        width={80}
        height={80}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div>
          <p>
            Written by{" "}
            <Link to={"/about"}>
              <strong className="bio-author">{author.name}</strong>
            </Link>
          </p>
          <div className="bio-summary">{author?.summary || null}</div>
          <a
            href={`https://github.com/${social?.github || ``}`}
            className="bio-sns"
          >
            Github
          </a>
        </div>
      )}
    </div>
  );
};

export default Bio;
