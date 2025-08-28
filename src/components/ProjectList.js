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

  // Filter out empty or non-deployable projects
  const deployableProjects = projects.filter(project => 
    project.size > 0 && // Has some content
    (project.language || project.description || project.name !== 'README') // Not just a README
  );

  if (deployableProjects.length === 0) {
    return (
      <div className="project-list empty">
        <p>No deployable projects found</p>
        <p>Make sure your GitHub repositories contain code files (not just READMEs)</p>
        <div className="deployment-tips">
          <h4>Tips for deployable projects:</h4>
          <ul>
            <li>Include an index.html file for static websites</li>
            <li>Add a package.json for Node.js projects</li>
            <li>Include requirements.txt for Python projects</li>
            <li>Ensure your repository has actual code files</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="project-list">
      {deployableProjects.map(project => (
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
              {project.size && (
                <span className="project-size">📦 {Math.round(project.size / 1024)}KB</span>
              )}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
              View on GitHub
            </a>
          </div>
          <button 
            onClick={() => onDeploy(project.id)}
            className="deploy-btn"
            title="Deploy this project"
          >
            Deploy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
