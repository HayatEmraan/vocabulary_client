"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import VocabularyCard from "./VocabularyCard";
import { useRouter } from "next/navigation";
import { completeLessonApi } from "@/services/userApi/lesson.api";
import Confetti from "react-confetti";
import React from "react";

type Props = {
  vocab: any;
  nextId: any;
  vocabId: string;
};

const Vocabulary = ({ vocab, nextId, vocabId }: Props) => {
  const navigate = useRouter();

  const handleBack = () => {
    navigate.back();
  };

  const [complete, setComplete] = React.useState(false);

  const handleNext = async () => {
    navigate.push(`/lesson/${vocabId}/${nextId?._id}`);
  };

  const handleComplete = async (id: string) => {
    const lesson = await completeLessonApi(id);

    if (lesson?.success) {
      setComplete(true);
      setTimeout(() => {
        navigate.push("/lesson");
      }, 1500);
    }
  };

  return (
    <Box>
      <Typography variant="h5">
        {vocab?.lessonId?.number} - {vocab?.word}
      </Typography>

      <VocabularyCard vocab={vocab} />

      <Box display="flex" gap={2} justifyContent={"space-between"}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          sx={{
            marginTop: 1,
            bgcolor: "purple",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Previous
        </Button>
        {nextId && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              marginTop: 1,
              bgcolor: "#1976D2",
              "&:hover": { backgroundColor: "#1976D2" },
            }}>
            Next
          </Button>
        )}

        {!nextId && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleComplete(vocabId)}
            sx={{
              marginTop: 1,
              bgcolor: "green",
              "&:hover": { backgroundColor: "#454" },
            }}>
            Complete
          </Button>
        )}
      </Box>

      {complete && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </Box>
  );
};

export default Vocabulary;
