import { Button } from "@mui/material";

type Props = {
  link: string;
  title: string;
};

const CtmButton = (props: Props) => {
  const { link, title } = props;
  return (
    <Button
      LinkComponent={"a"}
      href={link}
      variant="contained"
      sx={{ mr: 1, bgcolor: "#1976D2" }}>
      {title}
    </Button>
  );
};

export default CtmButton;
