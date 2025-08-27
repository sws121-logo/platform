// src/components/ProjectList.js
import React from 'react';

const ProjectList = ({ projects, onDeploy }) => {
  if (projects.length === 0) {
    return (
      <div className="project-list empty">
        <p>No projects found</p>
        <p>We'll fetch your GitHub repositories once you connect your account</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="project-info">
            <h4>{project.name}</h4>
            {project.description && (
              <p className="project-description">{project.description}</p>
            )}
            <div className="project-meta">
              {project.language && (
                <span className="project-language">{project.language}</span>
              )}
              {project.stars !== undefined && (
                <span className="project-stars">⭐ {project.stars}</span>
              )}
              {project.forks !== undefined && (
                <span className="project-forks">🍴 {project.forks}</span>
              )}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
              View on GitHub
            </a>
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

export default ProjectList;// src/components/ProjectList.js
import React from 'react';

const ProjectList = ({ projects, onDeploy }) => {
  if (projects.length === 0) {
    return (
      <div className="project-list empty">
        <p>No projects found</p>
        <p>We'll fetch your GitHub repositories once you connect your account</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="project-info">
            <h4>{project.name}</h4>
            {project.description && (
              <p className="project-description">{project.description}</p>
            )}
            <div className="project-meta">
              {project.language && (
                <span className="project-language">{project.language}</span>
              )}
              {project.stars !== undefined && (
                <span className="project-stars">⭐ {project.stars}</span>
              )}
              {project.forks !== undefined && (
                <span className="project-forks">🍴 {project.forks}</span>
              )}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
              View on GitHub
            </a>
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
