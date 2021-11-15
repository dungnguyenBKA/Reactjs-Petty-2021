import React from 'react';
import ReactDOM from 'react-dom';
import { AppStyle, height, width } from './AppStyle';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div style={AppStyle(width("100%"), height("100%"))}>
        <App/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
