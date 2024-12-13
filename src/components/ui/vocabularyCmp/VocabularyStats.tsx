"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Grid2 } from "@mui/material";
import { MdIncompleteCircle } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import { FaHourglassHalf } from "react-icons/fa";
import StatsCard from "@/components/common/StatsCard";
import { useEffect, useState } from "react";

const VocabularyStats = ({ vocabStats }: { vocabStats: any }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <Grid2 container spacing={3} sx={{ mb: 3 }}>
      <StatsCard number={vocabStats.total} title="Total Vocabularies">
        <SiVirustotal size={34} color="#007bff" />
      </StatsCard>
      <StatsCard number={vocabStats.completed} title="Completed Vocabularies">
        <MdIncompleteCircle size={34} color="#007bff" />
      </StatsCard>
      <StatsCard
        number={vocabStats.inCompleted}
        title="Incomplete Vocabularies">
        <FaHourglassHalf size={34} color="#6c757d" />
      </StatsCard>
    </Grid2>
  );
};

export default VocabularyStats;
