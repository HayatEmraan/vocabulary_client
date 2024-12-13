import { vocabStatsApi } from "@/services/adminApi/vacab.api";
import { Box } from "@mui/material";
import VocabularyTable from "@/components/ui/vocabularyCmp/VocabularyView";
import { getAllVocabApi } from "@/services/commonApi/vocab.api";
import VocabularyStats from "@/components/ui/vocabularyCmp/VocabularyStats";

const Page = async () => {
  const { data: vocabStats } = await vocabStatsApi();
  const { data: allVocab } = await getAllVocabApi();

  return (
    <Box>
      <VocabularyTable lessons={allVocab}>
        <VocabularyStats vocabStats={vocabStats} />
      </VocabularyTable>
    </Box>
  );
};

export default Page;
