import katex from 'katex'
import 'katex/dist/katex.min.css'

// Render a LaTeX string. block=true uses display mode (centered, larger).
// Use String.raw`...` for the children so backslashes don't need doubling.
export default function Tex({ children, block = false }) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
    strict: false,
  })
  return block
    ? <div className="tex-block" dangerouslySetInnerHTML={{ __html: html }} />
    : <span dangerouslySetInnerHTML={{ __html: html }} />
}
