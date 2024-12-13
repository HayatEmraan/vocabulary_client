import Header from "@/components/common/Header";
import { meApi } from "@/services/commonApi/me.api";
import { Box } from "@mui/material";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const me = await meApi();

  return (
    <Box>
      <Header user={me?.data} />
      {children}
    </Box>
  );
};

export default Layout;
