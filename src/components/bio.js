/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import "./bio.css"
import { rhythm } from "../utils/typography"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

library.add(fab, faHashtag)

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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
  `)

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div className="author-profile">
        <span className="author-name-prefix">Written by</span>
        <Link to={"/about"} className="author-name-content">
          <span>
            <FontAwesomeIcon
              icon={["fab", "slack-hash"]}
              style={{ marginRight: 2 }}
            />
            {author}
          </span>
        </Link>
        <br />
        <div className="author-introduce">Front-End Developer</div>

        <div className="author-sns">
          <a href="https://github.com/inkyojeong" style={{ boxShadow: `none` }}>
            <FontAwesomeIcon
              icon={["fab", "github"]}
              style={{ fontSize: 18, marginRight: 2 }}
            />
            Github
          </a>{" "}
          {/* {social.github && (
                    <a href={`https://github.com/${social.github}`}>GitHub</a>
                  )} */}
          <a
            href="https://facebook.com/e.viapolar"
            style={{ boxShadow: `none` }}
          >
            <FontAwesomeIcon
              icon={["fab", "facebook"]}
              style={{ fontSize: 18, marginRight: 2 }}
            />
            Facebook
          </a>{" "}
          <a href="https://instagram.com/in.gg" style={{ boxShadow: `none` }}>
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              style={{ fontSize: 18, marginRight: 2 }}
            />
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default Bio
