import VocabularyCreate from "@/components/ui/vocabularyCmp/VocabularyCreate";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { Box } from "@mui/material";

const Page = async () => {
  const { data: allLessons } = await getAllLessonApi();

  return (
    <Box>
      <VocabularyCreate lessons={allLessons} />
    </Box>
  );
};

export default Page;
