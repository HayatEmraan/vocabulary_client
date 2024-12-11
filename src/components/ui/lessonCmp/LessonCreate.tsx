/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FiUpload } from "react-icons/fi";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const PreviewImage = styled("img")`
  max-width: 200px;
  max-height: 350px;
  object-fit: cover;
  margin: 16px 0;
`;

const LessonCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    photo: null,
    photoPreview: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    number: false,
  });

  const handleNext = () => {
    if (activeStep === 0) {
      const newErrors = {
        name: !formData.name,
        number: !formData.number || !/^\d+$/.test(formData.number),
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

  const handlePhotoUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleInputChange("name")}
              error={errors.name}
              helperText={errors.name && "Name is required"}
              fullWidth
            />
            <TextField
              label="Number"
              value={formData.number}
              onChange={handleInputChange("number")}
              error={errors.number}
              helperText={errors.number && "Please enter a valid number"}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<FiUpload />}>
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>
            {formData.photoPreview && (
              <PreviewImage
                src={formData.photoPreview}
                alt="Preview"
                onError={(e: any) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1";
                }}
              />
            )}
          </Box>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Typography>Name: {formData.name}</Typography>
              <Typography>Number: {formData.number}</Typography>
              {formData.photoPreview && (
                <PreviewImage
                  src={formData.photoPreview}
                  alt="Preview"
                  onError={(e: any) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1";
                  }}
                />
              )}
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
          <StepLabel>Create Lesson</StepLabel>
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
          <StepLabel>Upload Photo</StepLabel>
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

export default LessonCreate;
