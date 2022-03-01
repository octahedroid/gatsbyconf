import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import SectionSeparator from "../components/section-separator";

export default function Post({ data: { node } }) {
  return (
    <Container>
      <Header />
      <article>
        <pre>
            { JSON.stringify(node, {}, 2) }
        </pre>
      </article>
      <SectionSeparator />
    </Container>
  );
}

export const query = graphql`
  query nodePage($id: String) {
    node: nodePage(id: {eq: $id}) {
      title
      body {
        processed
      }
    }
  }
`