import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import Teasers from "../components/teasers";
import SectionSeparator from "../components/section-separator";
import Footer from "../components/footer";
import Title from "../components/title";

export default function Blog({ data: { allArticles } }) {
  const nodes = allArticles.nodes;

  return (
    <Container>
      <Header />
      <Title>Blog</Title>
      {nodes.length > 0 && <Teasers nodes={nodes} />}
      <SectionSeparator />
      <Footer />
    </Container>
  );
}

export const query = graphql`
  {
    allArticles: allNodeArticle {
      nodes {
        id
        title
        created
        path {
          alias
        }
        body {
          summary
        }
        relationships {
          field_author: uid {
            field_full_name
            relationships {
              field_picture {
                relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(layout: FIXED, width: 48, height: 48)
                      }
                    }
                  }
                }
              }
            }
          }
          field_image {
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    large: gatsbyImageData(width: 1500)
                    small: gatsbyImageData(width: 760)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
