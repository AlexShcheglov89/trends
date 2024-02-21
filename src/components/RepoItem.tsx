import React from 'react';
import { Grid, Link, Typography, styled } from '@mui/material';

const Item = styled('div')({
  border: '1px solid #ccc',
  borderRadius: 10,
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.1)`,
  },
  margin: "10px 0",
  padding: "10px",
});

const Image = styled("img")({
  width: "120px",
  heght: "120px",
});

interface RepoItemProps {
  name: string;
  html_url: string;
  description: string;
  avatar_url: string;
}

const RepoItem: React.FC<RepoItemProps> = ({
  name,
  html_url,
  description,
  avatar_url,
}) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Item>
        <Grid container spacing={2}>
          <Grid item>
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="Owner Avatar" src={` ${avatar_url} `} />
            </a>
          </Grid>
          <Grid item>
            <Link
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <Typography variant="h6">{name}</Typography>
            </Link>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
};

export default RepoItem;
