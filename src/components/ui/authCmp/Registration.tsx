/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  Avatar,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaUser, FaEnvelope, FaLock, FaCloudUploadAlt } from "react-icons/fa";
import Link from "next/link";
import { registerApi } from "@/services/auth/register.api";
import CtmSnackbar from "@/components/common/Snackbar";
import { useRouter } from "next/navigation";

type errorType = {
  name?: string;
  email?: string;
  password?: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "16px",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useRouter();

  const [errors, setErrors] = useState<errorType>({
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState({
    name: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const [alert, setAlert] = useState(false);

  const [snack, setSnack] = useState({
    severity: "",
    title: "",
  });

  const validateForm = () => {
    const newErrors: errorType = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and numbers";
    }
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const formDataWithImage = new FormData();
      formDataWithImage.append("data", JSON.stringify(formData));
      formDataWithImage.append("image", photo as any);

      const userRegister = await registerApi(formDataWithImage);

      if (userRegister?.success) {
        setAlert(true);
        setSnack({ severity: "success", title: userRegister.message });
      } else {
        setAlert(true);
        setLoading(false);
        return setSnack({ severity: "error", title: userRegister.message });
      }

      setTimeout(() => {
        navigate.push("/auth/login");
      }, 1500);
    } else {
      setErrors(validationErrors);
    }

    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}>
      <StyledPaper elevation={3}>
        <StyledAvatar src={previewUrl} />
        <Typography component="h1" variant="h5" gutterBottom>
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: <FaUser style={{ marginRight: "8px" }} />,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <FaEnvelope style={{ marginRight: "8px" }} />,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <FaLock style={{ marginRight: "8px" }} />,
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<FaCloudUploadAlt />}
                fullWidth>
                Upload Photo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>
              {photo?.name && (
                <FormHelperText sx={{ ml: 1 }}>
                  Selected file: {photo.name}
                </FormHelperText>
              )}
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}>
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Register"
            )}
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              style={{
                color: "#1976D2",
              }}
              href="/auth/login">
              Login
            </Link>
          </Typography>
        </Box>
      </StyledPaper>

      <CtmSnackbar snack={snack} open={alert} setOpen={setAlert} />
    </Container>
  );
};

export default RegistrationPage;
