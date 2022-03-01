import React from "react";
import { htmlParser } from "../helpers/html-parser"

export default function BodyParser({ content, inlineImages }) {
  const parsedBody = htmlParser(content, inlineImages);

  return (
    <>
        {parsedBody}
    </>
  );
}
