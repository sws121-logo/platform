// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import DeployStatus from './components/DeployStatus';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [view, setView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const deploymentTimers = useRef({});

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('deployhub_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchGitHubRepos(userData.username);
    }
    
    const savedDeployments = localStorage.getItem('deployhub_deployments');
    if (savedDeployments) {
      setDeployments(JSON.parse(savedDeployments));
    }

    // Clean up timers on unmount
    return () => {
      Object.values(deploymentTimers.current).forEach(timerId => {
        clearTimeout(timerId);
      });
    };
  }, []);

  // Function to load mock data
  const loadMockData = (username) => {
    const mockProjects = [
      { id: 1, name: 'react-portfolio', url: `https://github.com/${username}/react-portfolio`, description: 'A portfolio website built with React' },
      { id: 2, name: 'ecommerce-site', url: `https://github.com/${username}/ecommerce-site`, description: 'An e-commerce platform' },
      { id: 3, name: 'blog-app', url: `https://github.com/${username}/blog-app`, description: 'A blogging application' },
      { id: 4, name: 'task-manager', url: `https://github.com/${username}/task-manager`, description: 'A task management application' },
      { id: 5, name: 'weather-app', url: `https://github.com/${username}/weather-app`, description: 'A weather forecasting application' },
    ];
    setProjects(mockProjects);
  };

  // Fetch GitHub repositories using public API
  const fetchGitHubRepos = async (username) => {
    setLoading(true);
    setError('');
    
    try {
      // Using GitHub's public API to get user repos
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('GitHub user not found');
        } else if (response.status === 403) {
          // Rate limit exceeded, fall back to mock data
          console.warn('GitHub API rate limit exceeded, using mock data');
          loadMockData(username);
          return;
        } else {
          throw new Error('Failed to fetch GitHub repositories');
        }
      }
      
      const repos = await response.json();
      
      // Filter out forks and only include repos that can be deployed
      const deployableRepos = repos.filter(repo => 
        !repo.fork && 
        repo.size > 0 && // Ensure repo has content
        (repo.language || // Has code files
         checkIfDeployable(repo)) // Or has other deployable content
      );
      
      // Transform GitHub API response to our project format
      const userProjects = deployableRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at,
        isFork: repo.fork,
        hasPages: repo.has_pages, // GitHub Pages indicator
        size: repo.size
      }));
      
      setProjects(userProjects);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      setError(error.message);
      // Fall back to mock data
      loadMockData(username);
    } finally {
      setLoading(false);
    }
  };

  // Check if a repo is deployable even without obvious code files
  const checkIfDeployable = (repo) => {
    // Check for common web project files
    const deployableFiles = [
      'index.html', 'package.json', 'requirements.txt', 
      'app.py', 'main.js', 'style.css', 'config.yml'
    ];
    
    // In a real app, we would check the repo contents via API
    // For now, we'll assume repos with reasonable size are deployable
    return repo.size > 10; // At least 10KB of content
  };

  // Save deployments to localStorage
  const saveDeployments = (deployments) => {
    localStorage.setItem('deployhub_deployments', JSON.stringify(deployments));
  };

  // Deploy project - FIXED version
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
      logs: ['Initializing deployment...']
    };
    
    const updatedDeployments = [newDeployment, ...deployments];
    setDeployments(updatedDeployments);
    saveDeployments(updatedDeployments);
    
    // FASTER build process with proper state updates
    const buildSteps = [
      { delay: 300, log: 'Cloning repository...' },
      { delay: 400, log: 'Analyzing project structure...' },
      { delay: 300, log: 'Installing dependencies...' },
      { delay: 500, log: 'Building application...' },
      { delay: 300, log: 'Finalizing deployment...' }
    ];
    
    let currentStep = 0;
    let totalDelay = 0;
    
    // Process each build step
    buildSteps.forEach((step, index) => {
      const timerId = setTimeout(() => {
        // Update logs for this step
        setDeployments(prevDeployments => {
          const updated = prevDeployments.map(d => {
            if (d.id === deploymentId) {
              const newLogs = [...d.logs, step.log];
              return { ...d, logs: newLogs };
            }
            return d;
          });
          saveDeployments(updated);
          return updated;
        });
        
        // If this is the final step, mark as deployed
        if (index === buildSteps.length - 1) {
          setTimeout(() => {
            setDeployments(prevDeployments => {
              const updated = prevDeployments.map(d => {
                if (d.id === deploymentId) {
                  return { 
                    ...d, 
                    status: 'deployed',
                    logs: [...d.logs, 'Deployment completed successfully! 🎉']
                  };
                }
                return d;
              });
              saveDeployments(updated);
              return updated;
            });
            
            // Clean up timer reference
            delete deploymentTimers.current[deploymentId];
          }, 100);
        }
      }, totalDelay);
      
      // Store timer reference for cleanup
      deploymentTimers.current[deploymentId] = timerId;
      totalDelay += step.delay;
    });
  };

  const handleLogin = (userData) => {
    const user = {
      id: 1,
      username: userData.username,
      name: userData.username,
      avatar: userData.avatar
    };
    
    setUser(user);
    localStorage.setItem('deployhub_user', JSON.stringify(user));
    fetchGitHubRepos(userData.username);
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setDeployments([]);
    localStorage.removeItem('deployhub_user');
    localStorage.removeItem('deployhub_deployments');
    
    // Clear all timers on logout
    Object.values(deploymentTimers.current).forEach(timerId => {
      clearTimeout(timerId);
    });
    deploymentTimers.current = {};
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
        {error && (
          <div className="error-banner">
            {error} - Showing demo data instead of your actual GitHub repositories.
          </div>
        )}
        
        {loading && <div className="loading">Loading your GitHub repositories...</div>}
        
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
