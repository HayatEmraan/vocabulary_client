"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import VocabularyCard from "./VocabularyCard";
import { useRouter } from "next/navigation";

const Vocabulary = ({ vocab }: { vocab: any }) => {
  const navigate = useRouter();

  const handleBack = () => {
    navigate.back();
  };
  return (
    <Box>
      <Typography variant="h5">
        {vocab?.lessonId?.number} - {vocab?.word}
        message
      </Typography>

      <VocabularyCard vocab={vocab} />

      <Box display="flex" gap={2} justifyContent={"space-between"}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          sx={{
            marginTop: 1,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 1,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Go Next
        </Button>
      </Box>
    </Box>
  );
};

export default Vocabulary;
