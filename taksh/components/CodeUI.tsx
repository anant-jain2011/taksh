import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { GoCopy, GoPencil } from "react-icons/go";

interface CodeHighlightProps {
  code: string;
  language: string;
}

export default function CodeUI({ code, language }: CodeHighlightProps) {
  const cleanCode = code.trim();

  useEffect(() => {
    const pre = document.querySelector("pre");

    const handleWheel = (e: WheelEvent) => {
      if (!pre) return;

      const atTop = pre.scrollTop === 0;
      const atBottom = pre.scrollTop + pre.clientHeight >= pre.scrollHeight;

      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.stopPropagation();
      }
    };

    pre.addEventListener("wheel", handleWheel);

    return () => pre.removeEventListener("wheel", handleWheel);
  }, []);

  // 1. Run highlight.js server-side to generate the marked up code tokens
  const highlighted = hljs.highlight(cleanCode, {
    language: language || "plaintext",
  }).value;

  // 2. Map lines safely into server-side compatible markup arrays
  const lines = highlighted.split(/\r?\n/);

  return (
    <div className="">
      <div
        className="w-full font-mono bg-[#171c23] border border-b-0 border-[#30363d] px-4 h-12 flex items-center text-gray-400 justify-between rounded-t-lg"
        style={{
          position: "sticky",
          top: "98px",
          letterSpacing: ".9px",
          fontSize: "12px",
        }}
      >
        <span>
          {lines.length} lines · {(cleanCode.length / 1024).toFixed(2)} KB
        </span>
        <div className="text-lg flex bbg-amber-600 w-30 h-full items-center justify-around">
          {(() => {
            let cls =
              "bg-[#222529] border-gray-400 rounded-sm size-7 p-1.25 cursor-pointer";

            return (
              <>
                <FiDownload
                  className={cls}
                  data-tooltip-target="tooltip-default"
                />
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip"
                >
                  Tooltip content
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <GoCopy className={cls} />
                <GoPencil className={cls} />
              </>
            );
          })()}
        </div>
      </div>

      <pre className="rounded-b-lg bg-[#0d1117] border border-[#30363d] overflow-auto text-sm font-mono p-4 max-h-screen">
        <code className={`language-${language} block min-w-full`}>
          <table className="w-full border-collapse select-text">
            <tbody>
              {lines.map((lineContent, index) => (
                <tr key={index} className="leading-6 vertical-top align-top">
                  {/* Server-baked Line Counters */}
                  <td
                    className="text-right pr-4 text-white select-none vertical-top align-top min-w-8 text-[10px] font-sans opacity-60 z-0 relative"
                    style={{ verticalAlign: "top" }}
                  >
                    {index + 1}
                  </td>

                  {/* Tokenized Syntax Marked Code */}
                  <td
                    className="pl-2 whitespace-pre text-left vertical-top align-top"
                    style={{ verticalAlign: "top" }}
                    dangerouslySetInnerHTML={{
                      __html: lineContent || "&nbsp;",
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </code>
      </pre>
    </div>
  );
}
