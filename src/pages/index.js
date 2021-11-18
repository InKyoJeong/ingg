import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import "./index.scss";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Category from "../components/category";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const [postsArr, setPostsArr] = useState(posts);

  const onClick = ({ target }) => {
    const filterPosts = posts.filter(post => {
      if (target.id === "all") {
        return posts;
      }
      return post.node.frontmatter.tags.join() === target.id;
    });

    setPostsArr(filterPosts);
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      <Category onClick={onClick} />

      {postsArr.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Link to={node.fields.slug} key={node.fields.slug}>
            <article className="index">
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 6),
                  }}
                  className="index-title"
                >
                  {title}
                </h3>
                <small className="index-date">{node.frontmatter.date}</small>
                <small className="index-time">‣ {node.timeToRead} min</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                  className="index-description"
                />
              </section>
            </article>
          </Link>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
