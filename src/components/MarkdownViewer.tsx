import React from 'react'
import { convertMarkdownToHTML } from '../libs/Sanitizer'

type Props = {
  markdownText: string
}

const MarkdownViewer = (props: Props) => {
  return (
    <div className='markdown-viewer'>
      {props.markdownText === '' ? (
        <p className='markdown-viewer__message'>※ 入力されるとプレビューに反映されます。</p>
      ) : (
        <div className='md' dangerouslySetInnerHTML={convertMarkdownToHTML(props.markdownText)} />
      )}
    </div>
  )
}

export default MarkdownViewer
