import React from 'react';
import ReactDOM from 'react-dom';
import { AppStyle, background, height, width } from './AppStyle';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from './AppColor';

ReactDOM.render(
  <React.StrictMode>
    <div style= {{maxWidth: '768px',  margin: 'auto', minHeight: "100vh", background: Colors.color_white}}>
      <App/>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);