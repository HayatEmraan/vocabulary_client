"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import StatsCard from "@/components/common/StatsCard";
import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";

import { FaUsers, FaUserShield, FaUserCheck } from "react-icons/fa";

const UserStats = ({ userStats }: { userStats: any }) => {

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    if (!hydrated) {
      return null;
    }
  return (
    <Grid2 container spacing={3} sx={{ mb: 3 }}>
      <StatsCard number={userStats.total} title="Total Users">
        <FaUserCheck size={24} color="#007bff" />
      </StatsCard>
      <StatsCard number={userStats.admin} title="Admin Users">
        <FaUserShield size={24} color="#007bff" />
      </StatsCard>
      <StatsCard number={userStats.user} title="Regular Users">
        <FaUsers size={24} color="#6c757d" />
      </StatsCard>
    </Grid2>
  );
};

export default UserStats;
