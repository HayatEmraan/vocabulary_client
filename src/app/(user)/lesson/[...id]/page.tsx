/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const findIdx = lessonVocab?.data.findIndex(
    (item: any) => item._id === id[1]
  );

  return (
    <Box>
      <ELearningVideoPage vocab={lessonVocab?.data} vocabId={id[1]}>
        <Vocabulary
          vocabId={id[0]}
          vocab={vocab}
          nextId={lessonVocab?.data[findIdx + 1]}
        />
      </ELearningVideoPage>
    </Box>
  );
};

export default Page;
