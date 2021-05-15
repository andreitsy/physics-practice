import React from "react";
import MDEditor, { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css';

const initialValue = `
# Solution

# Answer
\`\`\`KaTeX
% <-введите-ответ-здесь
\`\`\`
`;

export default function Editor() {
  return (
    <MDEditor
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
            console.log('>>>>>>update>>>>>', state)
          },
        },
      }}
    />
  );
}