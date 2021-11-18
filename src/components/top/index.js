import React from "react";
import { Link } from "gatsby";
import "./styles.scss";

import { ThemeContext } from "../../context/ThemeContext";
import styled from "@emotion/styled";
import { themes } from "../../theme";

const ThemedLayout = styled.div`
  color: ${props => themes[props.theme.name].foreground};
  background-color: ${props => themes[props.theme.name].background};
  transition: all 0.4s ease;
  polygon {
    transition: all 0.4s ease;
  }
`;

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath;
  return (
    <ThemeContext.Consumer>
      {theme => (
        <ThemedLayout theme={theme}>
          <div className="top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="line"
            >
              <polygon
                fill={theme.name === "light" ? "#ffffff" : "#292e2e"}
                points="0,100 100,0 100,100"
              />
            </svg>
            {!isRoot && (
              <Link to={`/`} className="link">
                {title}
              </Link>
            )}
          </div>
        </ThemedLayout>
      )}
    </ThemeContext.Consumer>
  );
};
