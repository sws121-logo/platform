// App.js - Main application component
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import DeployStatus from './components/DeployStatus';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [view, setView] = useState('dashboard');

  // Check if user is logged in (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('deployhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Simulate fetching projects from GitHub
  const fetchProjects = async () => {
    // In a real app, this would be an API call to your backend
    const mockProjects = [
      { id: 1, name: 'react-portfolio', url: 'https://github.com/user/react-portfolio' },
      { id: 2, name: 'ecommerce-site', url: 'https://github.com/user/ecommerce-site' },
      { id: 3, name: 'blog-app', url: 'https://github.com/user/blog-app' },
    ];
    setProjects(mockProjects);
  };

  // Simulate deployment process
  const deployProject = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Generate a random deployment ID and URL
    const deploymentId = Math.floor(Math.random() * 10000);
    const deployUrl = `https://${project.name}-${deploymentId}.deployhub.app`;
    
    // Add to deployments with "building" status
    const newDeployment = {
      id: deploymentId,
      projectId,
      projectName: project.name,
      status: 'building',
      url: deployUrl,
      date: new Date().toISOString()
    };
    
    setDeployments(prev => [newDeployment, ...prev]);
    
    // Simulate build process
    setTimeout(() => {
      setDeployments(prev => 
        prev.map(d => 
          d.id === deploymentId ? { ...d, status: 'deployed' } : d
        )
      );
    }, 5000);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('deployhub_user', JSON.stringify(userData));
    fetchProjects();
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setDeployments([]);
    localStorage.removeItem('deployhub_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>DeployHub</h1>
        <nav>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('deployments')}>Deployments</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      
      <main>
        {view === 'dashboard' && (
          <Dashboard 
            user={user} 
            projects={projects} 
            onDeploy={deployProject}
            deployments={deployments}
          />
        )}
        
        {view === 'deployments' && (
          <DeployStatus deployments={deployments} />
        )}
      </main>
    </div>
  );
}

export default App;
