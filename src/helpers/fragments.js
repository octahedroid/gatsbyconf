import { graphql } from "gatsby"

export const ParagraphBlogTeaser = graphql`
  fragment ParagraphBlogTeaser on paragraph__blog_teasers {
    id
  }
`

export const ParagraphHeroCta = graphql`
  fragment ParagraphHeroCta on paragraph__hero_cta {
    drupal_id
    field_intro
    field_title
    field_text
    field_cta {
      uri
      title
    }
  }
`

export const ParagraphText = graphql`
  fragment ParagraphText on paragraph__text {
    field_title
    field_text_rich {
      processed
    }
  }
`

export const ParagraphImage = graphql`
  fragment ParagraphImage on paragraph__image {
    relationships {
      field_image {
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 1024)
              }
            }
          }
        }
      }
    }
  }
`