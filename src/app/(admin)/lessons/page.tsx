import LessonTable from "@/components/ui/lessonCmp/LessonTable";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { Box } from "@mui/material";

const Page = async () => {
  const lessons = await getAllLessonApi();
  return (
    <Box>
      <LessonTable lessons={lessons?.data} />
    </Box>
  );
};

export default Page;
