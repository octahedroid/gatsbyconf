import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
// import Body from "../components/body";
// import BodyParser from "../components/body-parser";
import Title from "../components/title";

import SectionSeparator from "../components/section-separator";
import uuid from "react-uuid"

import { componentResolver } from "../helpers"

export default function Post({ data: { node } }) {

  // console.log(node.relationships.field_components)
  const components = componentResolver(node.relationships.field_components);

  return (
    <Container>
      <Header />
      <article className="mx-auto">
        { node.field_show_title && <Title>{node.title}</Title> }
        {/* <Body 
          content={node.body.processed} 
        />
        <SectionSeparator />
        <Body 
          content={node.fields.bodyProcessedWithInlineImages} 
        />
        <SectionSeparator /> */}
        {/* <HeroCta  /> */}
        {/* <BodyParser
          content={node.body.processed}
          inlineImages={node.fields.inlineImages}
        /> */}

        {/* Paragraph as React Components */}

        {components &&
          components.map((item) => {
            return <React.Fragment key={uuid()}>{item}</React.Fragment>
        })}

      </article>
      <SectionSeparator />
    </Container>
  );
}

export const query = graphql`
  query nodePage($id: String) {
    node: nodePage(id: {eq: $id}) {
      title
      created
      field_show_title
      body {
        processed
      }
    	fields {
				bodyProcessedWithInlineImages
        inlineImages {
					originalImageUrl
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1024)
            }
          }
        }
      }
      relationships {
        field_components {
          __typename
          ...ParagraphBlogTeaser
          ...ParagraphHeroCta
          ...ParagraphImage
          ...ParagraphText
        }
      }
    }
  }
`