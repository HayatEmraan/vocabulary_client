import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import Image from "next/image";
const HaltCourse = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        mt: 4,
        justifyContent: "space-between",
      }}>
      <Box
        display="flex"
        flexGrow={1}
        gap={2}
        alignItems="center"
        bgcolor={"#e4e4e4"}
        p={1.5}
        borderRadius={2.5}
        justifyContent="space-between">
        <Box display="flex" gap={1}>
          <Box display={{ xs: "none", md: "block" }}>
            <Image
              src={
                "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png"
              }
              alt="figma"
              width={50}
              height={50}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={450}>
              Japanese
            </Typography>
            <Typography color="#868686" lineHeight={1}>
              by Hayat
            </Typography>
          </Box>
        </Box>

        <DonutLargeIcon
          sx={{
            fontSize: 50,
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
          }}>
          continue
        </Button>
      </Box>

      <Box
        display={{
          xs: "none",
          md: "flex",
        }}
        gap={2}>
        <ArrowBackIcon
          sx={{
            border: "1px solid black",
            borderRadius: "50%",
            padding: 1.2,
            fontSize: 60,
          }}
        />
        <ArrowBackIcon
          sx={{
            transform: "rotate(180deg)",
            border: "2px solid black",
            borderRadius: "50%",
            padding: 1.2,
            fontSize: 60,
          }}
        />
      </Box>
    </Box>
  );
};

export default HaltCourse;
