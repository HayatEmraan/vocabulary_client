/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseBox from "@/components/ui/homeCmp/CourseBox";
import Greetings from "@/components/ui/homeCmp/Greetings";
import HaltCourse from "@/components/ui/homeCmp/HaltCourse";
import Lesson from "@/components/ui/lessonCmp/Lesson";
// import PaginationLink from "@/components/ui/Pagination";
import PremiumCard from "@/components/ui/homeCmp/PremiumCard";
import BasicArea from "@/components/ui/homeCmp/YourStats";
// import Search from "@/components/ui/Search";
import { Box, Grid2, Typography } from "@mui/material";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { meApi } from "@/services/commonApi/me.api";
import { getLessonStatsApi } from "@/services/userApi/lesson.api";

const Home = async () => {
  let ls, me, stats;

  try {
    const lessonsResponse = await getAllLessonApi();
    ls = lessonsResponse?.data || [];

    const meResponse = await meApi();
    me = meResponse?.data || null;

    const statsResponse = await getLessonStatsApi();
    stats = statsResponse?.data || { vocab: 0, lesson: 0, groupBy: [] };
  } catch {
    ls = [];
    me = null;
    stats = { vocab: 0, lesson: 0, groupBy: [] };
  }

  return (
    <>
      {/* <Search /> */}
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 7 }} sx={{ mt: { xs: 3, md: 1 } }}>
          <Greetings user={me} />
          <HaltCourse />
          <Typography variant="h5" fontWeight={450} mt={4}>
            All Lessons
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {ls?.map((lesson: any) => (
              <Lesson
                ls={lesson}
                key={lesson?._id}
                duration={lesson?.duration}
              />
            ))}
            {/* <PaginationLink /> */}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: { md: "flex", gap: 4 } }}>
            <CourseBox number={stats?.vocab} title="Vocab Completed" />
            <Box sx={{ mt: { xs: 3, md: 0 } }}>
              <CourseBox number={stats?.lesson} title="Lesson Completed" />
            </Box>
          </Box>

          <Box mb={4}>
            <Typography variant="h5" fontWeight={450} mt={4}>
              Your Statistics
            </Typography>

            <Box
              sx={{
                bgcolor: "#e4e4e4",
                mt: 2,
                borderRadius: 1.5,
              }}>
              <BasicArea stats={stats?.groupBy} />
            </Box>
          </Box>

          <PremiumCard />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
