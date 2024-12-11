import RecipeReviewCard from "@/components/ui/tutorialCmp/YTCard";
import { Box } from "@mui/material";

const Page = () => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent={"space-between"}
      gap={2}
      mt={4}>
      <RecipeReviewCard url="https://youtube.com/embed/WStjgYkAGsM" />
      <RecipeReviewCard url="https://youtube.com/embed/PmBxK3MwWug" />
      <RecipeReviewCard url="https://youtube.com/embed/nnHQneuJaVs" />
      <RecipeReviewCard url="https://youtube.com/embed/WyyJbdlKiEI" />
      <RecipeReviewCard url="https://youtube.com/embed/G_oC7anVuA8" />
      <RecipeReviewCard url="https://youtube.com/embed/GUqFU5u7rLQ" />
      <RecipeReviewCard url="https://youtube.com/embed/nYc-6Xt32bk" />
      <RecipeReviewCard url="https://youtube.com/embed/jiKnI3rjx54" />
      <RecipeReviewCard url="https://youtube.com/embed/mTIWMBfo2o8" />
    </Box>
  );
};

export default Page;
