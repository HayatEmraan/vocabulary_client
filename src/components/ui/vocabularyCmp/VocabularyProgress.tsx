"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

// Inspired by the former Facebook spinners.
const VocabularyProgress = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, width: "100%", mb: 1 }}>
      <Box>
        <Typography
          fontWeight={"bold"}
          fontSize={18}
          variant="body2"
          color="text.secondary">
          Vocabulary Progress
        </Typography>
        <BorderLinearProgress variant="determinate" value={100} />
      </Box>
    </Stack>
  );
}


export default VocabularyProgress