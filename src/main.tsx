import React from 'react'
import ReactDOM from 'react-dom/client'
import { MarketApp } from './MarketApp.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <MarketApp />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
