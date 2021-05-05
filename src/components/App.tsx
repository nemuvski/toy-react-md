import React from 'react';
import {useForm} from 'react-hook-form';
import MarkdownViewer from './MarkdownViewer';
import '../styles/components/app.scss';

const App = () => {
  const {register, watch} = useForm();
  const watchMarkdownText = watch('markdown-text', '');

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__heading app__heading--editor">エディタ</div>
        <textarea
          className="app__editor"
          placeholder="マークダウンが利用できます。"
          {...register('markdown-text')}
        />
      </div>
      <div className="app__container">
        <div className="app__heading app__heading--preview">プレビュー</div>
        <MarkdownViewer markdownText={watchMarkdownText} />
      </div>
    </div>
  );
}

export default App;
