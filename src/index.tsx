import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// 基本スタイルを反映.
import './styles/base.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
