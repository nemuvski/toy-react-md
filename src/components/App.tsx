import React, { useState } from 'react'
import MarkdownViewer from './MarkdownViewer'

const App = () => {
  const [markdownText, setMarkdownText] = useState('')

  return (
    <div className='app'>
      <div className='app__container'>
        <div className='app__heading app__heading--editor'>エディタ</div>
        <textarea
          className='app__editor'
          placeholder='マークダウンが利用できます。'
          value={markdownText}
          onChange={(event) => setMarkdownText(event.target.value)}
        />
      </div>
      <div className='app__container'>
        <div className='app__heading app__heading--preview'>プレビュー</div>
        <MarkdownViewer markdownText={markdownText} />
      </div>
    </div>
  )
}

export default App
