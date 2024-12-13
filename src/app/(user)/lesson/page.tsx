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
  const { data: ls } = await getAllLessonApi();
  const me = await meApi();

  const { data: stats } = await getLessonStatsApi();
  const { lessons, duration } = ls;
  return (
    <>
      {/* <Search /> */}
      <Grid2 container spacing={2}>
        <Grid2 size={7}>
          <Greetings user={me?.data} />
          <HaltCourse />
          <Typography variant="h5" fontWeight={450} mt={4}>
            All Lessons
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {lessons?.map((lesson: any) => (
              <Lesson ls={lesson} key={lesson._id} duration={duration} />
            ))}
            {/* <PaginationLink /> */}
          </Box>
        </Grid2>
        <Grid2 size={5}>
          <Box display="flex" gap={2}>
            <CourseBox number={stats?.vocab} title="Vocab Completed" />
            <CourseBox number={stats?.lesson} title="Lesson Completed" />
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
