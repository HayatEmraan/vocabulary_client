/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

import Editor from "../QuildEditor";
import Quill from "quill";
import CtmSnackbar from "@/components/common/Snackbar";
import { useRouter } from "next/navigation";
import { createVocabApi } from "@/services/adminApi/vacab.api";

const VocabularyCreate = ({ lessons }: { lessons: any[] }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    meaning: "",
    lesson: "",
  });

  const navigate = useRouter();

  const [lesson, setLesson] = useState("");

  const [errors, setErrors] = useState({
    word: false,
    pronunciation: false,
    meaning: false,
  });

  const [alert, setAlert] = useState(false);

  const [snack, setSnack] = useState({
    severity: "",
    title: "",
  });

  const handleNext = () => {
    if (activeStep === 0) {
      const newErrors = {
        word: !formData.word,
        pronunciation: !formData.pronunciation,
        meaning: !formData.meaning,
      };
      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string) => (event: any) => {
    if (field === "lesson") {
      setLesson(event.target.value);
    }

    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: false,
      });
    }
  };

  const handleSubmit = async () => {
    const obj = {
      ...formData,
      useCase: content,
    };

    const createVocab = await createVocabApi(obj);

    if (createVocab.success) {
      setAlert(true);
      setSnack({ severity: "success", title: createVocab.message });
    } else {
      setAlert(true);
      return setSnack({ severity: "error", title: createVocab.message });
    }

    setTimeout(() => {
      navigate.push("/auth/login");
    }, 1500);
  };

  const editorRef = useRef<Quill | null>(null);
  const [content, setContent] = useState<string>("");

  const handleTextChange = () => {
    const quill = editorRef.current;
    if (quill) {
      const htmlContent = quill.root.innerHTML;
      setContent(htmlContent);
    } else {
      console.error("Editor is not initialized.");
    }
  };

  console.log(lessons);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Word"
              value={formData.word}
              onChange={handleInputChange("word")}
              error={errors.word}
              helperText={errors.word && "Word is required"}
              fullWidth
            />
            <TextField
              label="Pronunciation"
              value={formData.pronunciation}
              onChange={handleInputChange("pronunciation")}
              error={errors.pronunciation}
              helperText={errors.pronunciation && "Pronunciation is required"}
              fullWidth
            />
            <TextField
              label="Meaning"
              value={formData.meaning}
              onChange={handleInputChange("meaning")}
              error={errors.meaning}
              helperText={errors.meaning && "Meaning is required"}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Lesson</InputLabel>
              <Select
                value={formData.lesson}
                label="Select Lesson"
                onChange={handleInputChange("lesson")}>
                {lessons?.map((lesson) => (
                  <MenuItem key={lesson._id} value={lesson._id}>
                    {lesson.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography>Where to use this word?</Typography>

            <Editor ref={editorRef} onTextChange={handleTextChange} />
          </Box>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Typography>Word: {formData.word}</Typography>
              <Typography>Pronunciation: {formData.pronunciation}</Typography>
              <Typography>Meaning: {formData.meaning}</Typography>
              <Typography>Lesson: {lesson}</Typography>
              <Typography variant="h6">Where to use this word?:</Typography>
              <Typography dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, p: 3 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Create Vocabulary</StepLabel>
          <StepContent>
            {getStepContent(0)}
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1, bgcolor: "#1976D2" }}>
                Continue
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Select Lesson</StepLabel>
          <StepContent>
            {getStepContent(1)}
            <Box sx={{ mt: 6.5 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1, bgcolor: "#1976D2" }}>
                Continue
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Preview & Submit</StepLabel>
          <StepContent>
            {getStepContent(2)}
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 1, mr: 1, bgcolor: "#1976D2" }}>
                Submit
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>

      <CtmSnackbar snack={snack} open={alert} setOpen={setAlert} />
    </Box>
  );
};

export default VocabularyCreate;
