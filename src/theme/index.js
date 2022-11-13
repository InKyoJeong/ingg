import styled from "@emotion/styled";

export const themes = {
  light: {
    foreground: "inherit",
    background: "#ffffff",
  },
  dark: {
    foreground: "#ffffff",
    background: "#292e2e",
  },
  title: "#00b5a8",
};

export const ThemedLayout = styled.div`
  color: ${props => themes[props.theme.name].foreground};
  background-color: ${props => themes[props.theme.name].background};
  transition: all 0.4s ease;
  min-height: 100vh;

  .author-profile a {
    color: ${props => (props.theme.name === "light" ? "#04648E" : "#8aa9f9")};
  }

  .index-title {
    color: ${props => (props.theme.name === "light" ? "#028177" : "#4FC8C0")};
  }
  .index-date,
  .index-description {
    color: ${props => (props.theme.name === "light" ? "#000" : "#FFF")};
  }
  .circle {
    border: 2px solid
      ${props => (props.theme.name === "light" ? "#28779a" : "#8aa9f9")};
  }
  .category-open,
  .category-bar__item {
    background-color: ${props =>
      props.theme.name === "light" ? "#509dbf" : "#8aa9f9"};
    color: ${props => (props.theme.name === "light" ? "#FFF" : "#292E2E")};
  }
`;
