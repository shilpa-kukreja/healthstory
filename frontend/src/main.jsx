
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="507984039635-r26il2eg3rk9pvf3f8q7gbrg17r5v09d.apps.googleusercontent.com">
  <BrowserRouter>
       <ShopContextProvider>
    <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>,
)
