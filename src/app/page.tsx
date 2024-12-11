import CourseBox from "@/components/ui/homeCmp/CourseBox";
import Greetings from "@/components/ui/homeCmp/Greetings";
import HaltCourse from "@/components/ui/homeCmp/HaltCourse";
import Lesson from "@/components/ui/lessonCmp/Lesson";
import PaginationLink from "@/components/ui/Pagination";
import PremiumCard from "@/components/ui/homeCmp/PremiumCard";
import BasicArea from "@/components/ui/homeCmp/YourStats";
// import Search from "@/components/ui/Search";
import { Box, Grid2, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      {/* <Search /> */}
      <Grid2 container spacing={2}>
        <Grid2 size={7}>
          <Greetings />
          <HaltCourse />
          <Typography variant="h5" fontWeight={450} mt={4}>
            All Lessons
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <PaginationLink />
          </Box>
        </Grid2>
        <Grid2 size={5}>
          <Box display="flex" gap={2}>
            <CourseBox number={3} title="Course Completed" />
            <CourseBox number={4} title="Course Progress" />
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
              <BasicArea />
            </Box>
          </Box>

          <PremiumCard />
        </Grid2>
      </Grid2>
    </>
  );
}
