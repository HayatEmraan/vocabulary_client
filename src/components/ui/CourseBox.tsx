import { Box, Typography } from "@mui/material";

type Props = {
  title: string;
  number: number;
};

const CourseBox = (props: Props) => {
  const { title, number } = props;
  return (
    <Box
      sx={{
        bgcolor: "#e4e4e4",
        p: 3.1,
        px: 3.5,
        borderRadius: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
      <Typography variant="h2" fontWeight={"bold"}>
        {number}
      </Typography>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

export default CourseBox;
