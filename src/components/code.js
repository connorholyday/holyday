import React from 'react'
import { render } from 'react-dom'
import { useMDXScope } from 'gatsby-plugin-mdx/context'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export const Code = ({ codeString, language, ...props }) => {
  const components = useMDXScope()
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} scope={components} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: '0.5rem 1rem',
              borderRadius: 2,
              overflow: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
}
