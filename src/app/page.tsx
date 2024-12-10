import CourseBox from "@/components/ui/CourseBox";
import Greetings from "@/components/ui/Greetings";
import HaltCourse from "@/components/ui/HaltCourse";
import Lesson from "@/components/ui/Lesson";
import PaginationLink from "@/components/ui/Pagination";
import PremiumCard from "@/components/ui/PremiumCard";
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
            <PaginationLink />
          </Box>
        </Grid2>
        <Grid2 size={5}>
          <Box display="flex" gap={2}>
            <CourseBox number={3} title="Course Completed" />
            <CourseBox number={4} title="Course Progress" />
          </Box>

          <PremiumCard />
        </Grid2>
      </Grid2>
    </>
  );
}
