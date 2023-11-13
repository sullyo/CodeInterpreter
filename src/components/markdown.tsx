"use client";

import { CodeBlock } from "@/components/code-block";
import { MemoizedReactMarkdown } from "@/components/memoized-react-markdown";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  text: string;
}

export default function Markdown({ text }: MarkdownProps) {
  return (
    <MemoizedReactMarkdown
      className="prose prose-slate max-w-none break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        a({ node, href, children, ...props }) {
          const childrenArray = React.Children.toArray(children);
          const childrenText = childrenArray

            .map((child) => child?.toString() ?? "")
            .join("");

          const cleanedText = childrenText.replace(/\[|\]/g, "");
          const isNumber = /^\d+$/.test(cleanedText);

          return isNumber ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              {...props}
              className="relative bottom-[6px] mx-0.5 rounded bg-mountain-meadow-100 px-[5px] py-[2px] text-[8px] font-bold no-underline hover:bg-mountain-meadow-100/80 dark:bg-colour-primary-800 dark:hover:bg-colour-primary-800/80"
            >
              {children}
            </a>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              {...props}
              className="hover:underline"
            >
              {children}
            </a>
          );
        },

        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeBlock
              key={crypto.randomUUID()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </MemoizedReactMarkdown>
  );
}
