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
  Grid2,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { loginApi } from "@/services/auth/login.api";
import { useRouter } from "next/navigation";
import CtmSnackbar from "@/components/common/Snackbar";

type errorType = {
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

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useRouter();

  const [alert, setAlert] = useState(false);

  const [snack, setSnack] = useState({
    severity: "",
    title: "",
  });

  const [errors, setErrors] = useState<errorType>({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors: errorType = {};
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const userLogin = await loginApi(formData);

      console.log(userLogin);
      if (userLogin.success) {
        setAlert(true);
        setSnack({ severity: "success", title: userLogin.message });
      } else {
        setAlert(true);
        return setSnack({ severity: "error", title: userLogin.message });
      }

      setTimeout(() => {
        navigate.push("/");
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleAdminLogin = () => {
    setFormData({ email: "hayatprestige@gmail.com", password: "Ig#opI12" });
  };

  const handleUserLogin = () => {
    setFormData({ email: "emraanhasanhayat@gmail.com", password: "Ig#opI12" });
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
        <StyledAvatar />
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
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
          </Grid2>

          <Box display={"flex"} justifyContent={"space-between"} gap={3}>
            <Button
              type="button"
              onClick={handleAdminLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "#1976D2" }}>
              Admin Login
            </Button>
            <Button
              type="button"
              onClick={handleUserLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "purple" }}>
              User Login
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don&apos;t have an account?{" "}
            <Link
              style={{
                color: "#1976D2",
              }}
              href="/auth/register">
              Register
            </Link>
          </Typography>
        </Box>
      </StyledPaper>

      <CtmSnackbar snack={snack} open={alert} setOpen={setAlert} />
    </Container>
  );
};

export default LoginPage;
