import StatsCard from "@/components/common/StatsCard";
import UserManagementTable from "@/components/ui/usersCmp/UserTable";
import { usersApi, userStatsApi } from "@/services/adminApi/users.api";
import { Grid2 } from "@mui/material";
import { FaUsers, FaUserShield, FaUserCheck } from "react-icons/fa";

const Page = async () => {
  const users = await usersApi();
  const { data: userStats } = await userStatsApi();

  return (
    <>
      <UserManagementTable users={users?.data}>
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
      </UserManagementTable>
    </>
  );
};

export default Page;
