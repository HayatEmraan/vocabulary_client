"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import StatsCard from "@/components/common/StatsCard";
import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBook, FaCheckCircle, FaPencilAlt } from "react-icons/fa";

const LessonStats = ({ lessonStats }: { lessonStats: any }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <Grid2 container spacing={3} sx={{ mb: 3 }}>
      <StatsCard number={lessonStats.created} title="Created Lessons">
        <FaBook size={40} color="#007bff" />
      </StatsCard>
      <StatsCard number={lessonStats.completed} title="Completed Lessons">
        <FaCheckCircle size={40} color="#007bff" />
      </StatsCard>
      <StatsCard number={lessonStats.edited} title="Edited Lessons">
        <FaPencilAlt size={40} color="#6c757d" />
      </StatsCard>
    </Grid2>
  );
};

export default LessonStats;
