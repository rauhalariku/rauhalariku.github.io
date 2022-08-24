import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

import { Typography } from '@mui/material';

import { keyword } from '../../config';

import Content from '../../content/projects.md';

import octokitService from '../../services/octokit';

import { Repository, RepositoryFull } from '../../types/types';

import ProjectGrid from './ProjectGrid';

const Projects = (): JSX.Element => {
  const [repositories, setRepositories] = useState<Array<RepositoryFull>>([]);
  const [projectsText, setProjectsText] = useState('');

  let filteredRepositories: Array<Repository> = repositories
    .filter(repository => !repository.fork)
    .map(repository => ({
      description: repository.description,
      homepage: repository.homepage,
      html_url: repository.html_url,
      id: repository.id,
      languages_url: repository.languages_url,
      name: repository.name,
      pushed_at: new Date(repository.pushed_at),
      topics: repository.topics,
      year: repository.created_at.substring(0,4)
    }))
    .sort((a, b) => b.pushed_at.getTime() - a.pushed_at.getTime());

  if (keyword.length > 0) {
    filteredRepositories = filteredRepositories
      .filter(repository =>
        repository.topics.includes(keyword)
      );
  }

  const setState = (repositoriesFromAPI: Array<RepositoryFull>) => {
    setRepositories(repositoriesFromAPI);
  };

  useEffect(() => {
    void octokitService.getRepositories(setState);
    fetch(Content)
      .then(content => content.text())
      .then(text => setProjectsText(text))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <ReactMarkdown>
        {projectsText}
      </ReactMarkdown>
      {
        repositories.length > 0
          ? <ProjectGrid repositories={filteredRepositories} />
          : <Typography paragraph component='p' variant='body1'> No projects yet!</Typography>
      }
    </>
  );
};

export default Projects;
