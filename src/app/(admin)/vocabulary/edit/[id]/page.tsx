import VocabularyCreate from "@/components/ui/vocabularyCmp/VocabularyCreate";
import { getAllLessonApi } from "@/services/commonApi/lesson.api";
import { getSingleVocabApi } from "@/services/commonApi/vocab.api";
import { Box } from "@mui/material";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { data: allLessons } = await getAllLessonApi() || {};

  const { data: vocab } = await getSingleVocabApi(id) || {};

  const obj = {
    word: vocab.word,
    pronunciation: vocab.pronunciation,
    meaning: vocab.meaning,
    _id: id,
  };

  return (
    <Box>
      <VocabularyCreate lessons={allLessons} defaultValue={obj} />
    </Box>
  );
};

export default Page;
