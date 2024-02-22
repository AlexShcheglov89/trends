import React, { ReactNode } from "react";
import {  Typography } from "@mui/material";

const TabPanel: React.FC<{
  value: number;
  index: number;
  children: ReactNode;
}> = ({ value, index, children }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`tabpanel-${index}`}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
};
export default TabPanel;
