import React, { useContext } from "react";

import HomeLogo from "../components/homelogo/homelogo";
import Layout from "../components/layout/layout";
import Seo from "../components/seo";
import { DarkModeStateContext } from "../context/DarkModeProvider";
import "./about.scss";

const AboutPage = ({ location }) => {
  const isDarkMode = useContext(DarkModeStateContext);

  return (
    <Layout location={location}>
      <HomeLogo />
      <Seo title="About Me" />
      <div className={`about ${isDarkMode ? "dark" : "light"}`}>
        <h1 className="about-me">
          <span>InKyo Jeong</span>
        </h1>
        <hr className="about-me__hr" />
        <table className="about-table">
          <tbody>
            <tr>
              <td>Blog</td>
              <td>
                <a href="https://ingg.dev" className="about-link">
                  https://ingg.dev
                </a>
              </td>
            </tr>
            <tr>
              <td>Github</td>
              <td>
                <a
                  href="https://github.com/InKyoJeong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-link"
                >
                  https://github.com/InKyoJeong
                </a>
              </td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>inkyo.dev@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AboutPage;
