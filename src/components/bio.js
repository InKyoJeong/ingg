/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import "./bio.scss"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
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
      <p>
        Written by{" "}
        <Link to={"about"} className="move-name">
          <span className="move-name-author">#{author}</span>
        </Link>
        <br />
        <a href="https://github.com/inkyojeong" style={{ boxShadow: `none` }}>
          Github
        </a>{" "}
        {/* {social.github && (
                    <a href={`https://github.com/${social.github}`}>GitHub</a>
                  )} */}
        <a href="https://facebook.com/e.viapolar" style={{ boxShadow: `none` }}>
          Facebook
        </a>{" "}
        <a href="https://instagram.com/in.gg" style={{ boxShadow: `none` }}>
          Instagram
        </a>
      </p>
    </div>
  )
}

export default Bio
