
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="23463632189-gth3ekrsj9te5q95l9on05u2t1gti9qt.apps.googleusercontent.com">
  <BrowserRouter>
       <ShopContextProvider>
    <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>,
)
