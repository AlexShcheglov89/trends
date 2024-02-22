import React from 'react';
import { Container, Typography, styled } from '@mui/material';
import RepoItem, { RepoItemProps } from './RepoItem';

const StyledStarredRepos = styled(Container)({
  marginTop: '20px',
});

interface StarredReposProps {
  starredRepos: RepoItemProps[];
  onStarToggle: (name: string) => void;
}

const StarredRepos: React.FC<StarredReposProps> = ({ starredRepos, onStarToggle }) => {
  return (
    <StyledStarredRepos>
      <Typography variant="h4" align="center" gutterBottom>
        Starred Repositories
      </Typography>
      {starredRepos.length > 0 ? (
        starredRepos.map((repo) => (
          <RepoItem
            key={repo.name}
            name={repo.name}
            html_url={repo.html_url}
            description={repo.description}
            isStarred={true}
            owner={repo.owner}
            id={repo.id}
            onStarToggle={onStarToggle}
          />
        ))
      ) : (
        <Typography variant="body1" align="center">
          You haven't starred any repositories yet.
        </Typography>
      )}
    </StyledStarredRepos>
  );
};

export default StarredRepos;
