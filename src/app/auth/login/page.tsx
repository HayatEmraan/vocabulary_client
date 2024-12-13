"use client"
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/components/ui/authCmp/Login"), {
  ssr: false,
});

const Index =  () => {
  return (
    <Box>
      <LoginPage />
    </Box>
  );
};

export default Index;
