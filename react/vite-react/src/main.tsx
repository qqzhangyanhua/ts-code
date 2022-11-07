import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import VisReport from '../lib/visReport/index';
VisReport.init({url: 'http://localhost',matchs:['data-click']})
VisReport.track('signup')
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <button data-click='{level:12,ac:0}'>按钮</button>
    </div>
    <App />
  </React.StrictMode>
)
