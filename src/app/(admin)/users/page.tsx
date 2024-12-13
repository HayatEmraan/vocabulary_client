import UserStats from "@/components/ui/usersCmp/UserStats";
import UserManagementTable from "@/components/ui/usersCmp/UserTable";
import { usersApi, userStatsApi } from "@/services/adminApi/users.api";

const Page = async () => {
  const users = await usersApi();
  const { data: userStats } = await userStatsApi();

  return (
    <>
      <UserManagementTable users={users?.data}>
       <UserStats userStats={userStats} />
      </UserManagementTable>
    </>
  );
};

export default Page;
