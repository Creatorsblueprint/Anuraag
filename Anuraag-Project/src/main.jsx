import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './utils/ThemeContext'
import { restoreRedirectedPath } from './router/router'
import './index.css'
import App from './App.jsx'

// Put the real address back if the visitor was sent here by public/404.html
// ("/?p=/speaking" -> "/speaking"). Must run before the app is drawn.
restoreRedirectedPath();

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
