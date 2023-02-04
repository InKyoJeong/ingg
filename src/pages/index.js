import React, { useContext, useState } from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio/bio";
import Seo from "../components/seo";
import Layout from "../components/layout/layout";
import Category from "../components/category/category";
import { DarkModeStateContext } from "../context/DarkModeProvider";
import "./index.scss";

const BlogIndex = ({ data, location }) => {
  const isDarkMode = useContext(DarkModeStateContext);

  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  const [postsArr, setPostsArr] = useState(posts);

  const handleCategoryToggle = ({ target }) => {
    const filterPosts = posts.filter(post => {
      if (target.id === "all") {
        return posts;
      }

      return post.frontmatter.tags.join() === target.id;
    });

    setPostsArr(filterPosts);
  };

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <Category onClick={handleCategoryToggle} />
      <ol style={{ listStyle: `none` }}>
        {postsArr.map(post => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className={`post-list-item ${isDarkMode ? "dark" : "light"}`}
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <h2>
                    <span itemProp="headline">{title}</span>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                  <small className="post-list-time">
                    ‣ {post.timeToRead} min
                  </small>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </Link>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
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
`;
