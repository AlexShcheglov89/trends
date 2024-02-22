import React from 'react';
import { CircularProgress, styled } from '@mui/material';

const StyledLoader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '250px',
});

const Loading: React.FC = () => {
  return (
    <StyledLoader>
      <CircularProgress />
    </StyledLoader>
  );
};

export default Loading;
