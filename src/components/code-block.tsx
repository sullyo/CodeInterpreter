"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock = ({ language, value }: Props) => {
  return (
    <div className="codeblock relative w-full font-sans">
      <div className="flex items-center justify-between rounded-t-lg bg-zinc-700 px-4 py-1">
        <span className="text-xs lowercase text-white">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        PreTag="div"
        style={coldarkDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          padding: "1.5rem 1rem",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "var(--font-inter)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
