// components/Login.js - GitHub OAuth simulation
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate GitHub OAuth process
    setTimeout(() => {
      onLogin({
        username,
        avatar: `https://github.com/${username}.png?size=100`,
        name: username
      });
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to DeployHub</h2>
        <p>Deploy your projects with ease</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">GitHub Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isConnecting || !username}
            className={isConnecting ? 'connecting' : ''}
          >
            {isConnecting ? 'Connecting to GitHub...' : 'Connect GitHub'}
          </button>
        </form>
        
        <div className="login-info">
          <p>This is a simulation. In a real application, this would:</p>
          <ul>
            <li>Redirect to GitHub OAuth</li>
            <li>Request access to your repositories</li>
            <li>Handle the callback with an access token</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
