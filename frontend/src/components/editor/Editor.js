import React from "react";
import MDEditor, { commands } from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css';

const initialValue = `#### Решение
[comment]: <> (введите решение в это поле)
Пример latex формулы:
\`\`\`KaTeX
\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}
\`\`\`
`;

export default function Editor({onChange}) {
  return (
    <MDEditor
      onChange={onChange}
      value={initialValue}
      previewOptions={{
        components: {
          code: ({ inline, children, className, ...props }) => {
            const txt = children[0] || '';
            if (inline) {
              if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                  throwOnError: false,
                });
                return <code dangerouslySetInnerHTML={{ __html: html }} />;
              }
              return <code>{txt}</code>;
            }
            if (
              typeof txt === 'string' &&
              typeof className === 'string' &&
              /^language-katex/.test(className.toLocaleLowerCase())
            ) {
              const html = katex.renderToString(txt, {
                throwOnError: false,
              });
              return <code dangerouslySetInnerHTML={{ __html: html }} />;
            }
            return <code className={String(className)}>{txt}</code>;
          },
          execute: (state: commands.TextState, api: commands.TextApi)  => {
            console.log('>>>>', state)
          },
        },
      }}
    />
  );
}