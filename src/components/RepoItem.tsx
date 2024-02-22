import React from "react";
import { Grid, Link, Typography, styled, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Item = styled("div")({
  border: "1px solid #ccc",
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

const StarButton = styled(IconButton)({
  marginLeft: "auto",
  height: "40px",
});

export interface RepoItemProps {
  name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
  };
  id: string;
  isStarred: boolean;
  onStarToggle: (id: string) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({
  name,
  html_url,
  description,
  owner,
  isStarred,
  id,
  onStarToggle,
}) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Item>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={11} container spacing={2}>
            <Grid item>
              <a href={html_url}>
                <Image alt="Owner Avatar" src={owner.avatar_url} />
              </a>
            </Grid>
            <Grid item>
              <Link href={html_url} color="primary">
                <Typography variant="h6">{name}</Typography>
              </Link>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={1} justifyContent="flex-end">
            <StarButton
              color={isStarred ? "primary" : "default"}
              onClick={() => onStarToggle(id)}
            >
              <StarIcon />
            </StarButton>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
};

export default RepoItem;
