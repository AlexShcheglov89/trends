import React from "react";
import { Container, Typography, styled } from "@mui/material";
import RepoItem, { RepoItemProps } from "./RepoItem";
import Loading from "./Loading";

interface RepoListProps {
  repos: RepoItemProps[];
  starredRepos: RepoItemProps[];
  onStarToggle: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const StyledRepoList = styled(Container)({
  marginTop: "20px",
});

const RepoList: React.FC<RepoListProps> = ({repos, starredRepos, onStarToggle, error, loading}) => {
  return (
    <StyledRepoList>
      <Typography variant="h4" align="center" gutterBottom>
        Most Popular GitHub Repositories
      </Typography>
      {loading && !error ? (
        <Loading />
      ) : error ? (
        <div>
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        repos.map((repo) => (
          <RepoItem
            key={repo.id}
            name={repo.name}
            html_url={repo.html_url}
            description={repo.description}
            isStarred={starredRepos.findIndex(starred => starred.id === repo.id) >= 0}
            owner={repo.owner}
            onStarToggle={onStarToggle}
            id={repo.id}
          />
        ))
      )}
    </StyledRepoList>
  );
};

export default RepoList;
