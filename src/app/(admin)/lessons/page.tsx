import StatsCard from "@/components/common/StatsCard";
import LessonTable from "@/components/ui/lessonCmp/LessonTable";
import { lessonStatsApi } from "@/services/adminApi/lesson.api";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { Box, Grid2 } from "@mui/material";

import { FaBook, FaCheckCircle, FaPencilAlt } from "react-icons/fa";

const Page = async () => {
  const lessons = await getAllLessonApi();
  const { data: lessonStats } = await lessonStatsApi();

  return (
    <Box>
      <LessonTable lessons={lessons?.data}>
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
      </LessonTable>
    </Box>
  );
};

export default Page;
