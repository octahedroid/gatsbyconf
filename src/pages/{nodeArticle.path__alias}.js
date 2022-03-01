import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import Body from "../components/body";
import Cover from "../components/cover";
import SectionSeparator from "../components/section-separator";

export default function Post({ data: { node } }) {
  const author = {
    name: node.relationships.field_author.field_full_name,
    picture: node.relationships.field_author.relationships.field_picture.relationships.field_media_image.localFile.childImageSharp,
  }

  return (
    <Container>
      <Header />
      <article className="prose prose-lg max-w-6xl mx-auto">
        <Cover
          title={node.title}
          coverImage={node.relationships.field_image.relationships.field_media_image.localFile.childImageSharp}
          date={node.created}
          author={author}
        />
        <Body content={node?.body?.processed} />
      </article>
      <SectionSeparator />
    </Container>
  );
}

export const query = graphql`
  query nodeArticle($id: String) {
    node: nodeArticle(id: {eq: $id}) {
      title
      created
      body {
        processed
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
                  gatsbyImageData(width: 1500)
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function config() {
  // GraphQL Query
  // - Fetch allNodeArticle filtered by field_rendering_mode equals to DSG
  // - Any other(s) filter(s) could be implemented as an example by creation date to only SSG latest 100 and DSG all the others
  const { data } = graphql`  
  {
    dsgArticles: allNodeArticle (filter:{field_rendering_mode:{eq:"DSG"}}) {
      nodes {
        path {
          alias
        }
      }
    }
  }
  `

  // console.log(data);
  return ({ params }) => {
    const pathAlias = `/${params.path__alias}`;
    console.log( `params: ${params.path__alias}` )
    return {
      defer: data.dsgArticles.nodes.some( article => article.path.alias === pathAlias )
    }
  }
}