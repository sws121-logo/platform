// components/Dashboard.js - Main dashboard
import React from 'react';
import ProjectList from './ProjectList';
import DeploymentList from './DeploymentList';

const Dashboard = ({ user, projects, onDeploy, deployments }) => {
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
          <DeploymentList deployments={deployments.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
