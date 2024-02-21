import React from "react";
import { CircularProgress, styled } from "@mui/material";

const Loader = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
});

const Loading: React.FC = () => {
  return (
    <Loader>
      <CircularProgress />
    </Loader>
  );
};

export default Loading;
