# GatsbyConf - Decoupling Drupal Using Gatsby: A Crash Course workshop


## 1 - Get the code on your local machine

Use git to clone the code repository

```
git clone https://github.com/octahedroid/gatsbyconf.git

cd gatsbyconf
``` 

Install dependencies
```
yarn 
```

Start Gatsby on develop mode
```
yarn develop
```

## 2.A - Rendering field data

Open page file:
```
src/pages/{nodePage.path__alias}.js
```

Remove JSON output
```
<pre>
    { JSON.stringify(node, {}, 2) }
</pre>
```

Import components
```
import Title from "../components/field/title";
import Body from "../components/field/body";
```

Add components to the page 
```
<Title>{node.title}</Title>

<Body
  content={node?.body?.processed}
/>
```

## 2.B - Show/Hide field title feature

Open page file:
```
 src/pages/{nodePage.path__alias}.js
```

Add `field_show_title` to GraphLQ Query
```
    field_show_title
```

Replace original code:

```
<Title>{node.title}</Title>
```

With this code containing the field_show_title value validation to show/hide title

```
{ node.field_show_title && <Title>{node.title}</Title> }
```

## 3.A - Serve images from Drupal CMS

Open page file:
```
 src/pages/{nodePage.path__alias}.js
```

Add `bodyProcessedWithInlineImages` field to GraphLQ Query
```
# GraphQL Customization Fields
fields {
  bodyProcessedWithInlineImages
}
```

Update `Body` component to use previously added field

```
<Body
  content={node.fields.bodyProcessedWithInlineImages}
/>
```

```
<Body
  content={node?.body?.processed}
/>
```

> Check `gatsby-node.js` for code to replace image relativePath with remotePath

## 3.B - Serve images as Gatsby Images

Open page file:
```
src/pages/{nodePage.path__alias}.js
```

Add `inlineImages` field to GraphLQ Query
```
# GraphQL Customization Fields
fields {
    inlineImages {
      originalImageUrl
      localFile {
        childImageSharp {
          gatsbyImageData(width: 1024)
        }
      }
    }
}
```

Replace original `Body` compoenent with `BodyInlineImages`:

```
import BodyInlineImages from "../components/field/body-inline-images";
```

With the recently imported `BodyParser` component

```
<BodyInlineImages
  content={node?.body?.processed}
  inlineImages={node.fields.inlineImages}
/>
```

> Check `gatsby-node.js` for code to replace image relativePath with remotePath

---

## 4 - Replace Body field with Paragraphs and React components

Add `relationships` field
```
      relationships {
        field_components {
          __typename
          ...ParagraphBlogTeaser
          ...ParagraphHeroCta
          ...ParagraphImage
          ...ParagraphText
        }
      }
```

> Check `src/helpers/fragments.js` for code to GraphQL query fragments

Import `uuid` library and `componentResolver` helper
```
import uuid from "react-uuid"
import { componentResolver } from "../helpers/component-resolver"
```

Call `componentResolver` helper

```
const components = componentResolver(node?.relationships?.field_components);
```

> Check `src/helpers/component-resolver.js` file for resolvers

Replace `BodyInlineImages` component:

```
<BodyInlineImages
  content={node?.body?.processed}
  inlineImages={node.fields.inlineImages}
/>
```

With the `components` array constant

```
{components &&
  components.map((item) => {
    return <React.Fragment key={uuid()}>{item}</React.Fragment>
})}
```

Remove no longer needed classNames at `article` html
```
<article className="prose prose-lg max-w-6xl mx-auto">
```

It should look like this:
```
<article>
```

## 5.A - Rendering field data

Open page file:
```
src/pages/{nodeArticle.path__alias}.js
```

Remove JSON output
```
<pre>
    { JSON.stringify(node, {}, 2) }
</pre>
```

Import component
```
import Cover from "../components/cover";
```

Add fields to GraphQL Query 
```
      created
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
```

Add code 
```
const author = {
  name: node.relationships.field_author.field_full_name,
  picture: node.relationships.field_author.relationships.field_picture.relationships.field_media_image.localFile.childImageSharp,
}
```


Add `Cover` component to the page

```
<Cover
  className="prose prose-lg max-w-6xl mx-auto"
  title={node.title}
  coverImage={node.relationships.field_image.relationships.field_media_image.localFile.childImageSharp}
  date={node.created}
  author={author}
/>
```

## 5.B - Add CodeBlock Component

Open fragments file:
```
src/helpers/fragments.js
```

Add GraphQL query fragment to `src/helpers/fragments.js` file
```
export const ParagraphCodeBlock = graphql`
  fragment ParagraphCodeBlock on paragraph__code_block {
    field_title
    field_code
    field_language
    field_show_line_numbers
  }
`
```


Open page file:
```
src/pages/{nodeArticle.path__alias}.js
```

Add `field_components` and use fragments to `relationships` field

```
        field_components {
          __typename
          ...ParagraphText
          ...ParagraphCodeBlock
        }
```

Import `uuid` library and `componentResolver` helper
```
import uuid from "react-uuid"
import { componentResolver } from "../helpers/component-resolver"
```

Call `componentResolver` helper

```
const components = componentResolver(node?.relationships?.field_components);
```

Render the `components` array constant

```
{components &&
  components.map((item) => {
    return <React.Fragment key={uuid()}>{item}</React.Fragment>
})}
```

Remove no longer needed classNames at `article` html
```
<article className="prose prose-lg max-w-6xl mx-auto">
```

It should look like this:
```
<article>
```


Open component resolver file:
```
src/helpers/component-resolver.js
```

Import `CodeBlock` component

```
import ParagraphCodeBlock from "../components/paragraph/paragraph-code-block";
```

Add code to resolve component
```
    if (component.__typename.includes(`paragraph__code_block`)) {
        return (
            <ParagraphCodeBlock 
                title={component.field_title}
                code={component.field_code}
                language={component.field_language}
                showLineNumbers={component.field_show_line_numbers}
            />
        )
    }
```

## 6 - Using Deferred Static Generation (DSG)

Open page file:
```
src/pages/{nodeArticle.path__alias}.js
```

Add a new `config` function to the page template 

```
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

  return ({ params }) => {
    const pathAlias = `/${params.path__alias}`;
    return {
      defer: data.dsgArticles.nodes.some( article => article.path.alias === pathAlias )
    }
  }
}
```

## Q & A

Other Drupal Modules:
- https://www.drupal.org/project/yaml_content
- https://www.drupal.org/project/gatsby
- https://www.drupal.org/project/build_hooks
- https://www.drupal.org/project/jsonapi_node_preview_tab
- https://www.drupal.org/project/layout_paragraphs
- https://www.drupal.org/project/jsonapi_include_lb

