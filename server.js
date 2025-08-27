const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const users = [
  { id: 1, username: 'demo', name: 'Demo User', avatar: 'https://github.com/demo.png?size=100' }
];

const projects = [
  { id: 1, name: 'react-portfolio', url: 'https://github.com/demo/react-portfolio', userId: 1 },
  { id: 2, name: 'ecommerce-site', url: 'https://github.com/demo/ecommerce-site', userId: 1 },
  { id: 3, name: 'blog-app', url: 'https://github.com/demo/blog-app', userId: 1 }
];

const deployments = [];

// Routes
app.get('/api/user', (req, res) => {
  res.json(users[0]);
});

app.get('/api/projects', (req, res) => {
  const userId = parseInt(req.query.userId) || 1;
  const userProjects = projects.filter(p => p.userId === userId);
  res.json(userProjects);
});

app.post('/api/deploy', (req, res) => {
  const { projectId } = req.body;
  const project = projects.find(p => p.id === parseInt(projectId));
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  const deploymentId = Math.floor(Math.random() * 10000);
  const deployment = {
    id: deploymentId,
    projectId: project.id,
    projectName: project.name,
    status: 'building',
    url: `https://${project.name}-${deploymentId}.deployhub.app`,
    date: new Date().toISOString()
  };
  
  deployments.unshift(deployment);
  
  // Simulate build process
  setTimeout(() => {
    const index = deployments.findIndex(d => d.id === deploymentId);
    if (index !== -1) {
      deployments[index].status = 'deployed';
    }
  }, 5000);
  
  res.json(deployment);
});

app.get('/api/deployments', (req, res) => {
  const userId = parseInt(req.query.userId) || 1;
  const userProjects = projects.filter(p => p.userId === userId).map(p => p.id);
  const userDeployments = deployments.filter(d => userProjects.includes(d.projectId));
  res.json(userDeployments);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
