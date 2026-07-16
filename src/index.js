import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import Bootstrap CSS and JS Bundle
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
