import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './index.css'
import store from './Slice/Store.js';
import { Toaster } from "./UIs/shadcn-ui/sonner.jsx";
import { Provider } from 'react-redux';

export const cookies = new Cookies(); // Initialize cookies

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);