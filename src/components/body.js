import React from "react";

export default function Body({ content }) {
  return (
    <div dangerouslySetInnerHTML={{__html: content}}></div>
  );
}
