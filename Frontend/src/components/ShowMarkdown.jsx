import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ShowMarkdown = ({ content }) => {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeText = String(children).replace(/\n$/, "");

          // For code blocks
          if (!inline && match) {
            return (
              <div className="relative group">
                <button
                  onClick={() => handleCopy(codeText)}
                  className="absolute right-2 top-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition"
                >
                  {copied === codeText ? "Copied!" : "Copy"}
                </button>
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md"
                  {...props}
                >
                  {codeText}
                </SyntaxHighlighter>
              </div>
            );
          }

          // For inline code
          return (
            <span className="relative group">
              <code
                className={`px-1 py-0.5 rounded bg-gray-700 ${className}`}
                {...props}
              >
                {children}
              </code>
              <button
                onClick={() => handleCopy(codeText)}
                className="ml-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition"
              >
                📋
              </button>
            </span>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default ShowMarkdown;
