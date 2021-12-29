import React from "react";
import { Link, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import Utterances from "../components/comments/Utterances";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

import "./blog-post.scss";
import "./code.scss";
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article>
          <header>
            <h1
              className="post-title"
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),

                opacity: 0.6,
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>

          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="inner"
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
            className="bio-hr"
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul className="post-nav">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <Utterances />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
