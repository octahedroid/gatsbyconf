import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default function ParagraphImage({ image }) {

  return (
      <div className="flex items-center justify-center">
        <GatsbyImage
          image={image}
          alt={`Alt Cover text`}
        />
      </div>
  );
}
