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
  query nodeArticle($id: String) {
    node: nodeArticle(id: {eq: $id}) {
      title
      body {
        processed
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