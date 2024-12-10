import { Box, Button, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";

const Lesson = () => {
  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "#e4e4e4",
        borderRadius: 2.5,
      }}>
      <Box
        mx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Image
          src={
            "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png"
          }
          alt="figma"
          width={50}
          height={50}
        />
        <Box>
          <Typography variant="h5" fontWeight={450}>
            Learn Figma
          </Typography>
          <Typography color="#868686" lineHeight={1}>
            by Hayat
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <AccessTimeFilledIcon />
          <Typography variant="h6">06h 30m</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <StarIcon />
          <Typography variant="h6">4.9</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
          }}>
          View Vocabulary
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson;
