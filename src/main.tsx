
import { createRoot } from 'react-dom/client'
import { TanStackRouterProvider } from './router'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <TanStackRouterProvider>
    <App />
  </TanStackRouterProvider>
);
