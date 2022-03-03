import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

export default function ParagraphCodeBlock({ title, code, language, showLineNumbers }) {
  return (
    <>
      <h1>
          <span className="mt-2 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
          </span>
      </h1>
      <div className="max-w-6xl mx-auto">
        <CodeBlock
          text={code}
          language={language}
          showLineNumbers={showLineNumbers}
          theme={dracula}
          wrapLines
        />
      </div>
    </>
  );
}