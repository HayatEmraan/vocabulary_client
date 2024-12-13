"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const Registration = dynamic(
  () => import("@/components/ui/authCmp/Registration"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <Box>
      <Registration />
    </Box>
  );
};

export default Page;
