/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  snack: { severity: string; title: string };
};

const CtmSnackbar = (props: Props) => {
  const { open, setOpen, snack } = props;

  const { severity, title } = snack;

  const handleClose = () => {
    setOpen(() => false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}>
      <Alert
        onClose={handleClose}
        severity={severity as any}
        variant="filled"
        sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default CtmSnackbar;
