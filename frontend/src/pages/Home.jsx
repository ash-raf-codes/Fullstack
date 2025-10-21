import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Home.css'

function Home() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home-container">
      <h1>Welcome to Contact Manager</h1>
      
      {isAuthenticated ? (
        <div className="welcome-message">
          <h2>Hello, {user.name}!</h2>
          <div className="user-profile">
            {user.picture && <img src={user.picture} alt="Profile" className="profile-image" />}
            <p>{user.email}</p>
          </div>
          <button 
            className="auth-button logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
          <div className="features">
            <h3>Your Contact Management Dashboard</h3>
            <ul>
              <li>View your contacts</li>
              <li>Add new contacts</li>
              <li>Update existing contacts</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="guest-message">
          <h2>Get Started with Contact Manager</h2>
          <p>Please log in to access your contacts.</p>
          <button 
            className="auth-button login"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
          <div className="features">
            <h3>Features</h3>
            <ul>
              <li>Secure contact storage</li>
              <li>Easy contact management</li>
              <li>Access from anywhere</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home