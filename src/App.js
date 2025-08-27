// src/App.js
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
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('deployhub_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchProjects();
      fetchDeployments();
    }
  }, []);

  // Simulate fetching projects from GitHub
  const fetchProjects = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockProjects = [
        { id: 1, name: 'react-portfolio', url: 'https://github.com/user/react-portfolio' },
        { id: 2, name: 'ecommerce-site', url: 'https://github.com/user/ecommerce-site' },
        { id: 3, name: 'blog-app', url: 'https://github.com/user/blog-app' },
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  };

  // Simulate fetching deployments
  const fetchDeployments = async () => {
    const savedDeployments = localStorage.getItem('deployhub_deployments');
    if (savedDeployments) {
      setDeployments(JSON.parse(savedDeployments));
    }
  };

  // Save deployments to localStorage
  const saveDeployments = (deployments) => {
    localStorage.setItem('deployhub_deployments', JSON.stringify(deployments));
  };

  // Deploy project
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
      date: new Date().toISOString(),
      logs: ['Initializing deployment...', 'Cloning repository...']
    };
    
    const updatedDeployments = [newDeployment, ...deployments];
    setDeployments(updatedDeployments);
    saveDeployments(updatedDeployments);
    
    // Simulate build process with steps
    const buildSteps = [
      { delay: 1000, log: 'Installing dependencies...' },
      { delay: 2000, log: 'Building application...' },
      { delay: 3000, log: 'Optimizing assets...' },
      { delay: 1000, log: 'Deploying to production...' }
    ];
    
    let currentStep = 0;
    const updateBuildProcess = () => {
      if (currentStep < buildSteps.length) {
        setTimeout(() => {
          newDeployment.logs.push(buildSteps[currentStep].log);
          currentStep++;
          
          // Update the deployment in state
          const updatedDeployments = deployments.map(d => 
            d.id === deploymentId ? { ...d, logs: [...newDeployment.logs] } : d
          );
          setDeployments(updatedDeployments);
          saveDeployments(updatedDeployments);
          
          updateBuildProcess();
        }, buildSteps[currentStep].delay);
      } else {
        // Mark as deployed
        const updatedDeployments = deployments.map(d => 
          d.id === deploymentId ? { ...d, status: 'deployed' } : d
        );
        setDeployments(updatedDeployments);
        saveDeployments(updatedDeployments);
      }
    };
    
    updateBuildProcess();
  };

  const handleLogin = (userData) => {
    const user = {
      id: 1,
      username: userData.username,
      name: userData.username,
      avatar: `https://github.com/${userData.username}.png?size=100`
    };
    
    setUser(user);
    localStorage.setItem('deployhub_user', JSON.stringify(user));
    fetchProjects();
    fetchDeployments();
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setDeployments([]);
    localStorage.removeItem('deployhub_user');
    localStorage.removeItem('deployhub_deployments');
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
        {loading && <div className="loading">Loading...</div>}
        
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
