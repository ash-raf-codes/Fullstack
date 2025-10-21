import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import './App.css'

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li className="auth-section">
              {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Log In</button>
              ) : (
                <div className="user-info">
                  <span>Welcome, {user?.name}!</span>
                  <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/contacts" 
              element={
                isAuthenticated ? (
                  <Contacts />
                ) : (
                  <div className="login-prompt">
                    Please log in to view contacts
                  </div>
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
