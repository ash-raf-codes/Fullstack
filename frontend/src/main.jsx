import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3qjw0uit40e4p2dg.ca.auth0.com"
      clientId="cVIBA2KsLdejb0nr77yKvsRYwKvLp3oL"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-3qjw0uit40e4p2dg.ca.auth0.com/api/v2/"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
