import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'nprogress/nprogress.css';
import './app/styles/global.less';
import App from './app/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
