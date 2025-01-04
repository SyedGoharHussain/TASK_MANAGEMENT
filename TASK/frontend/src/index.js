import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18+
import './index.css';  // Optional: Global styles
import App from './App';  // The root component of your app

const root = ReactDOM.createRoot(document.getElementById('root'));  // Find the root div in index.html
root.render(
  <React.StrictMode>
    <App />  {/* App is the starting component of your app */}
  </React.StrictMode>
);
