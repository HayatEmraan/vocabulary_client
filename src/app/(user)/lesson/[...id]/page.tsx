import ELearningVideoPage from "@/components/ui/Combine";
import Vocabulary from "@/components/ui/vocabularyCmp/Vocabulary";
import {
  getSingleVocabApi,
  getVocabByLessonApi,
} from "@/services/commonApi/vocab.api";
import { Box } from "@mui/material";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { data: vocab } = await getSingleVocabApi(id[1]);
  const lessonVocab = await getVocabByLessonApi(id[0]);

  return (
    <Box>
      <ELearningVideoPage vocab={lessonVocab?.data}>
        <Vocabulary vocab={vocab} />
      </ELearningVideoPage>
    </Box>
  );
};

export default Page;
