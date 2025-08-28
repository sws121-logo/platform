// src/components/DeploymentList.js
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
              {deployment.status === 'building' && (
                <span className="quick-deploy-notice">Fast deployment in progress...</span>
              )}
            </p>
            
            {deployment.status === 'building' && (
              <div className="deployment-progress">
                <div 
                  className="deployment-progress-bar" 
                  style={{ width: `${(deployment.logs.length / 6) * 100}%` }}
                ></div>
              </div>
            )}
            
            <p className="date">
              {new Date(deployment.date).toLocaleString()}
            </p>
            
            {deployment.logs && deployment.logs.length > 0 && (
              <div className="deployment-logs">
                <details>
                  <summary>View logs ({deployment.logs.length})</summary>
                  <div className="logs-content">
                    {deployment.logs.map((log, index) => (
                      <div key={index} className="log-entry">
                        <span className="log-time">
                          {new Date(deployment.date).toLocaleTimeString()}
                        </span>
                        <span className="log-message">{log}</span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
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
