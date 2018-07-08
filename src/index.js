// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Instruments
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Containers
import App from './containers/App/app';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
