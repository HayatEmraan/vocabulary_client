/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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

const VocabularyCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    meaning: "",
    lesson: "",
  });

  const [lesson, setLesson] = useState("");

  const [errors, setErrors] = useState({
    word: false,
    pronunciation: false,
    meaning: false,
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
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: false,
      });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const categories = ["Technology", "Business", "Education", "Entertainment"];

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
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}>
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
                sx={{ mt: 1, mr: 1 }}>
                Submit
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
};

export default VocabularyCreate;
