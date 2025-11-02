import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AgriProvider } from './context/AgriContext.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

// Wrapper component to pass user to AgriProvider
const AgriProviderWrapper = ({ children }) => {
  const { user } = useAuth();
  return <AgriProvider user={user}>{children}</AgriProvider>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AgriProviderWrapper>
      <App />
        </AgriProviderWrapper>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
