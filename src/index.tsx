import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./components/App";
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
