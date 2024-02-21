import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import RepoItem from "./RepoItem";
import moment from "moment";
import Loading from "./Loading";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}

const DATE_LAST_WEEK = moment().subtract(1, "week").format("YYYY-MM-DD");

const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<{ items: Repo[] }>(
          `https://api.github.com/search/repositories?q=created:>${DATE_LAST_WEEK}&sort=stars&order=desc`
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error("Error while fetching repositories:", error);
        setError("Error while fetching repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Most Popular GitHub Repositories
      </Typography>
      {loading && !error ? (
        <Loading />
      ) : error ? (
        <Typography variant="body1">
          {error}
        </Typography>
      ) : (
        <div>
          {repos.map((repo) => (
            <RepoItem
              key={repo.id}
              name={repo.name}
              html_url={repo.html_url}
              description={repo.description}
              avatar_url={repo.owner.avatar_url}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default RepoList;
