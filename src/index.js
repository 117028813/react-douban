import React from 'react';
import ReactDOM from 'react-dom';
import './normallize.css';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
