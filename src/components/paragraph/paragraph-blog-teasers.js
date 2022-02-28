import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Teasers from "../teasers";


export default function ParagraphBlogTeasers() {

    return (
        <StaticQuery
            query={graphql`
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

      `}
            render={data => <Teasers nodes={data.allArticles.nodes} />}
        />
    )
}
