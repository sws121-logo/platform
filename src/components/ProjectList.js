// components/ProjectList.js - List of GitHub projects
import React from 'react';

const ProjectList = ({ projects, onDeploy }) => {
  if (projects.length === 0) {
    return (
      <div className="project-list empty">
        <p>No projects found</p>
        <p>In a real application, we would fetch your repositories from GitHub</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="project-info">
            <h4>{project.name}</h4>
            <p>{project.url}</p>
          </div>
          <button 
            onClick={() => onDeploy(project.id)}
            className="deploy-btn"
          >
            Deploy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
