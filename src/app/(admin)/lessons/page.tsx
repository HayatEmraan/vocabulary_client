import LessonStats from "@/components/ui/lessonCmp/LessonStats";
import LessonTable from "@/components/ui/lessonCmp/LessonTable";
import { lessonStatsApi } from "@/services/adminApi/lesson.api";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { Box } from "@mui/material";

const Page = async () => {
  const lessons = await getAllLessonApi();
  const { data: lessonStats } = await lessonStatsApi() || {};

  return (
    <Box>
      <LessonTable lessons={lessons?.data}>
        <LessonStats lessonStats={lessonStats} />
      </LessonTable>
    </Box>
  );
};

export default Page;
