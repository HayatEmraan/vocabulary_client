import UserManagementTable from "@/components/ui/usersCmp/UserTable";
import { usersApi } from "@/services/adminApi/users.api";

const Page = async () => {
  const users = await usersApi();

  return (
    <>
      <UserManagementTable users={users?.data} />
    </>
  );
};

export default Page;
