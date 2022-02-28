import React from "react";
import Teaser from '../components/teaser'

export default function Teasers({ nodes }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {nodes.map(node => {
            const author = {
              name: node.relationships.field_author.field_full_name,
              picture: node.relationships.field_author.relationships.field_picture.relationships.field_media_image.localFile.childImageSharp,
            }
            return (
              <Teaser
                key={node.id}
                title={node.title}
                coverImage={node.relationships.field_image.relationships.field_media_image.localFile.childImageSharp}
                date={node.created}
                author={author}
                slug={node.path.alias}
                excerpt={node.body.summary}
              />
          )}
        )}
      </div>
    </section>
  )
}
