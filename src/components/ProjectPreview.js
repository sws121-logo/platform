// src/components/ProjectPreview.js
import React from 'react';

const ProjectPreview = ({ deployment, onClose }) => {
  if (!deployment) return null;

  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <div className="preview-header">
          <h2>Project Preview: {deployment.projectName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="preview-content">
          <div className="preview-url">
            <strong>Live URL:</strong> 
            <a href={deployment.url} target="_blank" rel="noopener noreferrer">
              {deployment.url}
            </a>
          </div>
          
          <div className="preview-frame">
            <div className="preview-placeholder">
              <div className="preview-image">
                <div className="website-mockup">
                  <div className="browser-bar">
                    <div className="browser-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="browser-url">{deployment.url}</div>
                  </div>
                  <div className="website-content">
                    <h3>🚀 {deployment.projectName} is Live!</h3>
                    <p>This project has been successfully deployed to DeployHub.</p>
                    <div className="project-details">
                      <h4>Project Information:</h4>
                      <ul>
                        <li><strong>Status:</strong> <span className="status deployed">Deployed</span></li>
                        <li><strong>Deployed:</strong> {new Date(deployment.date).toLocaleString()}</li>
                        <li><strong>URL:</strong> {deployment.url}</li>
                      </ul>
                    </div>
                    <div className="deployment-actions">
                      <button className="visit-btn" onClick={() => window.open(deployment.url, '_blank')}>
                        Visit Website
                      </button>
                      <button className="copy-url-btn" onClick={() => {
                        navigator.clipboard.writeText(deployment.url);
                        alert('URL copied to clipboard!');
                      }}>
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="preview-actions">
            <p className="preview-note">
              <strong>Note:</strong> This is a simulation. In a real deployment platform, you would see:
            </p>
            <ul>
              <li>Your actual deployed website content</li>
              <li>Real-time analytics</li>
              <li>Deployment logs and history</li>
              <li>Custom domain settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
