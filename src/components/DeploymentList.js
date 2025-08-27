// components/DeploymentList.js - List of deployments
import React from 'react';

const DeploymentList = ({ deployments }) => {
  if (deployments.length === 0) {
    return (
      <div className="deployment-list empty">
        <p>No deployments yet</p>
        <p>Deploy a project to see it here</p>
      </div>
    );
  }

  return (
    <div className="deployment-list">
      {deployments.map(deployment => (
        <div key={deployment.id} className="deployment-card">
          <div className="deployment-info">
            <h4>{deployment.projectName}</h4>
            <p className={`status ${deployment.status}`}>
              Status: {deployment.status}
            </p>
            <p className="date">
              {new Date(deployment.date).toLocaleString()}
            </p>
          </div>
          <div className="deployment-actions">
            <a 
              href={deployment.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`view-btn ${deployment.status === 'building' ? 'disabled' : ''}`}
            >
              View Live
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeploymentList;
