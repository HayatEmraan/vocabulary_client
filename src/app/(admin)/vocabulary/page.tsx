import StatsCard from "@/components/common/StatsCard";
import { vocabStatsApi } from "@/services/adminApi/vacab.api";
import { Box, Grid2 } from "@mui/material";
import { MdIncompleteCircle } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import { FaHourglassHalf } from "react-icons/fa";
import VocabularyTable from "@/components/ui/vocabularyCmp/VocabularyView";
import { getAllVocabApi } from "@/services/commonApi/vocab.api";

const Page = async () => {
  const { data: vocabStats } = await vocabStatsApi();

  const { data: allVocab } = await getAllVocabApi();

  return (
    <Box>
      <VocabularyTable lessons={allVocab}>
        <Grid2 container spacing={3} sx={{ mb: 3 }}>
          <StatsCard number={vocabStats.total} title="Total Vocabularies">
            <SiVirustotal size={34} color="#007bff" />
          </StatsCard>
          <StatsCard
            number={vocabStats.completed}
            title="Completed Vocabularies">
            <MdIncompleteCircle size={34} color="#007bff" />
          </StatsCard>
          <StatsCard
            number={vocabStats.inCompleted}
            title="Incomplete Vocabularies">
            <FaHourglassHalf size={34} color="#6c757d" />
          </StatsCard>
        </Grid2>
      </VocabularyTable>
    </Box>
  );
};

export default Page;
