/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { BiError } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const StyledErrorContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: 600,
  height: "auto",
  marginBottom: 32,
});

const ErrorIcon = styled(BiError)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
  const errorImage =
    statusCode === 404
      ? "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b"
      : "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf";

  const defaultMessage =
    statusCode === 404
      ? "Oops! The page you're looking for doesn't exist."
      : "Sorry! Something went wrong on our servers.";

  const navigate = useRouter();

  const handleGoHome = () => {
    navigate.push("/");
  };

  return (
    <StyledErrorContainer>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <ErrorIcon />
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: "bold",
                color: "text.primary",
              }}>
              {statusCode} - {message}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{
                fontSize: { xs: "1rem", md: "1.5rem" },
                maxWidth: 600,
                margin: "0 auto",
              }}>
              {defaultMessage}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <StyledImage
              src={errorImage}
              alt={`${statusCode} error illustration`}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee";
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleGoHome}
              startIcon={<IoMdArrowRoundBack />}
              sx={{
                borderRadius: 8,
                padding: "12px 32px",
                fontSize: "1.1rem",
                textTransform: "none",
              }}>
              Back to Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </StyledErrorContainer>
  );
};

export default ErrorPage;
