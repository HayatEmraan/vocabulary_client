import VocabularyCreate from "@/components/ui/vocabularyCmp/VocabularyCreate";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { Box } from "@mui/material";

const Page = async () => {
  const { data: lessons } = (await getAllLessonApi()) || {};

  return (
    <Box>
      <VocabularyCreate lessons={lessons} />
    </Box>
  );
};

export default Page;
