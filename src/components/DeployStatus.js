// components/DeployStatus.js - Deployment status page
import React from 'react';

const DeployStatus = ({ deployments }) => {
  return (
    <div className="deploy-status">
      <h2>All Deployments</h2>
      <div className="deployments-container">
        {deployments.length === 0 ? (
          <p className="no-deployments">No deployments yet</p>
        ) : (
          deployments.map(deployment => (
            <div key={deployment.id} className="deployment-item">
              <div className="deployment-header">
                <h3>{deployment.projectName}</h3>
                <span className={`status-badge ${deployment.status}`}>
                  {deployment.status}
                </span>
              </div>
              <div className="deployment-details">
                <p>URL: <a href={deployment.url} target="_blank" rel="noopener noreferrer">{deployment.url}</a></p>
                <p>Deployed on: {new Date(deployment.date).toLocaleString()}</p>
              </div>
              <div className="deployment-actions">
                <a 
                  href={deployment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`action-btn ${deployment.status === 'building' ? 'disabled' : ''}`}
                >
                  Visit Site
                </a>
                <button className="action-btn">
                  Copy Link
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeployStatus;
