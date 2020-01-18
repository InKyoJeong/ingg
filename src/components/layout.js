import React from "react"
import { Top } from "../components/top/top"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import SwitchDark from "../components/dark-mode/switch"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    // const headerStyle = {
    //   display: "inline-block",
    //   width: "100%",
    //   height: "100px",
    //   background: "yellow",
    // }
    let header
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1.4),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
      // } else {
      //   header = (
      //     <h3
      //       style={{
      //         fontFamily: `Montserrat, sans-serif`,
      //         marginTop: 0,
      //       }}
      //     >
      //       <Link
      //         style={{
      //           boxShadow: `none`,
      //           textDecoration: `none`,
      //           color: `inherit`,
      //         }}
      //         to={`/`}
      //       >
      //         {title}
      //       </Link>
      //     </h3>
      //   )
    }
    return (
      <React.Fragment>
        <Top title={title} location={location} rootPath={rootPath} />

        <div
          style={{
            backgroundColor: `var(--bg)`,
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <SwitchDark></SwitchDark>
          <header>{header}</header>
          <main>{children}</main>
          <footer>© {new Date().getFullYear()}, Inkyo Jeong</footer>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
