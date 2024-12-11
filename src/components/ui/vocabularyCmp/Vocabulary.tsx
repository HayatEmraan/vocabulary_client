import { Box, Button, Typography } from "@mui/material";
import RecipeReviewCard from "../VocabularyCard";

const Vocabulary = () => {
  return (
    <Box>
      <Typography variant="h5">
        82-8 Starting of a new Journey with special message
      </Typography>

      <RecipeReviewCard />

      <Box display="flex" gap={2} justifyContent={"space-between"}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 1,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 1,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Go Next
        </Button>
      </Box>
    </Box>
  );
};

export default Vocabulary;
