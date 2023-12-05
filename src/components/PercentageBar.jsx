import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const PercentageBar = ({ resultPerPartai }) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "70%", mr: 1, ml: 4 }}>
            <LinearProgress variant="determinate" value={resultPerPartai} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${resultPerPartai}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PercentageBar;
