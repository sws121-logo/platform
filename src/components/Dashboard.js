// src/components/Dashboard.js
import React, { useState } from 'react';
import ProjectList from './ProjectList';
import DeploymentList from './DeploymentList';
import ProjectPreview from './ProjectPreview';

const Dashboard = ({ user, projects, onDeploy, deployments }) => {
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <h2>Welcome, {user.name}!</h2>
        <p>Deploy your GitHub projects with a single click</p>
      </div>
      
      <div className="dashboard-content">
        <div className="projects-section">
          <h3>Your GitHub Projects</h3>
          <ProjectList projects={projects} onDeploy={onDeploy} />
        </div>
        
        <div className="deployments-section">
          <h3>Recent Deployments</h3>
          <DeploymentList deployments={deployments} />
        </div>
      </div>

      <ProjectPreview 
        deployment={selectedDeployment} 
        onClose={() => setSelectedDeployment(null)} 
      />
    </div>
  );
};

export default Dashboard;
