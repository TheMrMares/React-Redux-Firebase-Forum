import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
//ENV DOESNT WORK
require('dotenv').config();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
