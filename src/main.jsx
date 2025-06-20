import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (typeof window !== 'undefined') {
  // Web Vitals monitoring
  import('web-vitals').then((webVitals) => {
    // Web Vitals v5+ uses a different API
    webVitals.onCLS(console.log);
    webVitals.onFID(console.log);
    webVitals.onFCP(console.log);
    webVitals.onLCP(console.log);
    webVitals.onTTFB(console.log);
  }).catch(err => {
    console.error('Error loading web-vitals:', err);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)