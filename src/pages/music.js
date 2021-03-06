import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "./home.scss"
import homelogo from "../../content/assets/homelogo.svg"

class Music extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="cover_logo">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <img src={homelogo} alt="Logo" />
          </Link>
        </div>
        <h1>Music</h1>
        <iframe
          className="video"
          title="music"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02SsgTiXno8X9zHcn2aasO2yY"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h1>Music_1hour</h1>
        <iframe
          className="video"
          title="music2"
          src="https://www.youtube.com/embed/videoseries?list=PLcTVu2Bx02Sv9-u3Ln4JKRK49J9fCzSFV"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        {/* 
        재생목록 퍼가기
        컴퓨터에서 YouTube 계정에 로그인합니다.
        페이지 왼쪽에서 퍼가려는 재생목록을 선택합니다.
        URL에서 재생목록 ID를 복사합니다.
        다음 안내에 따라 개별 동영상의 소스 코드를 수정합니다.
        'embed/' 뒤에 나오는 동영상 ID를 'videoseries?list='로 대체합니다.
        그런 다음 '=' 뒤에 재생목록 ID를 붙여넣습니다. */}
      </Layout>
    )
  }
}

export default Music

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
