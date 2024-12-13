import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const TimelineContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
}));

const TimelineItem = styled(Paper)(() => ({
  padding: "20px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: "-20px",
    height: "20px",
    width: "2px",
    backgroundColor: "#1976d2",
  },
  "&:last-child::before": {
    display: "none",
  },
}));

const WordContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});

const JapaneseTimeline = ({ word, pronunciation, meaning }) => {
  return (
    <TimelineContainer>
      <TimelineItem elevation={3}>
        <WordContainer>
          <Typography
            variant="h4"
            sx={{ color: "#1976d2", fontWeight: "bold" }}>
            {word}
          </Typography>
          <Typography variant="h5" sx={{ color: "#666" }}>
            {pronunciation}
          </Typography>
          <Typography variant="h6">{meaning}</Typography>
        </WordContainer>
      </TimelineItem>
    </TimelineContainer>
  );
};

export default JapaneseTimeline;
