import React from "react"
import { Link } from "gatsby"
// import { GitHubIcon } from "../social-share/github-icon"
import "./top.css"

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link" style={{ boxShadow: `none` }}>
          {title}
        </Link>
      )}
      {/* <GitHubIcon /> */}
    </div>
  )
}
