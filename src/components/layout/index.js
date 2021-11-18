import React from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../../utils/typography";
import { ThemeContext } from "../../context/ThemeContext";
import ModeSwitch from "../switch";
import { Top } from "../top";
import { Footer } from "../footer";
import { ThemedLayout } from "../../theme";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(0.9),
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
      );
    }
    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <ThemedLayout theme={theme}>
              <Top title={title} location={location} rootPath={rootPath} />
              <div
                style={{
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  maxWidth: rhythm(24),
                  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                }}
              >
                <ModeSwitch theme={theme} />
                <header>{header}</header>
                <main>{children}</main>
                <Footer />
              </div>
            </ThemedLayout>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    );
  }
}

export default Layout;
