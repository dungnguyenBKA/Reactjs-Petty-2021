import React from 'react';
import ReactDOM from 'react-dom';
import { AppStyle, background, height, width } from './AppStyle';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from './AppColor';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ width: '100%', height: "100%", maxWidth: 1080, margin: '0px auto 50px', background: '#fff' }}>
      <App />
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);