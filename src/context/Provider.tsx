"use client";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d1d1d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e4e4e4",
    },
  },
});

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default Provider;
