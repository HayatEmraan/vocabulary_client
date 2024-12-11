import { Button } from "@mui/material";

const CtmButton = () => {
  return (
    <Button
      LinkComponent={"a"}
      href="/create"
      variant="contained"
      sx={{ mr: 1, bgcolor: "#1976D2" }}>
      Add Lesson
    </Button>
  );
};

export default CtmButton;
