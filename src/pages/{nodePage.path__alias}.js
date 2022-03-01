import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Post({ data: { node } }) {
  return (
    <Container>
      <Header />
      <article className="prose prose-lg max-w-6xl mx-auto">
        <pre>
            { JSON.stringify(node, {}, 2) }
        </pre>
      </article>
      <Footer />
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