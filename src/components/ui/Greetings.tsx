import { Box, Typography } from "@mui/material";

const Greetings = () => {
  return (
    <Box
      sx={{
        bgcolor: "#e4e4e4",
        p: 3.5,
        px: 4,
        borderRadius: 1.5,
      }}>
      <Typography color="#232323" variant="h4" fontWeight={"bold"}>
        Hello Hayat!
      </Typography>
      <Typography
        sx={{
          color: "#868686",
        }}>
        it&apos;s good to see you again
      </Typography>
    </Box>
  );
};

export default Greetings;
