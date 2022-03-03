import React from "react";
import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Title from "./field/title";

export default function Cover({ title, coverImage, date, author }) {
  return (
    <div className="prose prose-lg max-w-6xl mx-auto">
      <Title>{title}</Title>
      <div className="md:block md:mb-12">
        <Avatar name={author?.name} picture={author?.picture} />
      </div>
      <div className="mb-6 text-lg">
        <Date dateString={date} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} fluid={coverImage?.gatsbyImageData} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
      </div>
    </div>
  );
}
