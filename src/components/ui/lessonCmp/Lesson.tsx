import { Box, Button, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";

type Props = {
  createdAt: string;
  name: string;
  number: number;
  updatedAt: string;
  photoURL: string;
  adminId: { name: string };
  _id: string;
};

const Lesson = ({ ls }: { ls: Props }) => {
  const { name, _id } = ls;

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
        <Image src={ls?.photoURL} alt="figma" width={50} height={50} />
        <Box>
          <Typography variant="h5" fontWeight={450}>
            {name}
          </Typography>
          <Typography color="#868686" lineHeight={1}>
            by {ls?.adminId?.name}
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <AccessTimeFilledIcon />
          <Typography variant="h6">30m</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <StarIcon />
          <Typography variant="h6">4.9</Typography>
        </Box>
        <Button
          LinkComponent={"a"}
          href={`/lesson/${_id}`}
          variant="contained"
          sx={{
            borderRadius: 2,
          }}>
          View Vocab
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson;
