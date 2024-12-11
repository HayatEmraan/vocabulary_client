import { Box, Typography } from "@mui/material";
import Image from "next/image";
import helloGreet from "./hello.gif";

const Greetings = () => {
  return (
    <Box
      sx={{
        bgcolor: "#e4e4e4",
        p: 3.5,
        px: 4,
        borderRadius: 1.5,
        position: "relative",
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

      <Box sx={{ position: "absolute", top: -40, right: 0 }}>
        <Image src={helloGreet} alt="hello" width={200} height={170} />
      </Box>
    </Box>
  );
};

export default Greetings;