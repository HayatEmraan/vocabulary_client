import Vocabulary from "@/components/ui/Vocabulary";
import AccordionUsage from "@/components/ui/VocabularyAccordion";
import CustomizedProgressBars from "@/components/ui/VocabularyProgress";
import { Grid2 } from "@mui/material";

const Page = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={7}>
        <Vocabulary />
      </Grid2>
      <Grid2 size={5}>
        <CustomizedProgressBars />
        <AccordionUsage />
      </Grid2>
    </Grid2>
  );
};

export default Page;
