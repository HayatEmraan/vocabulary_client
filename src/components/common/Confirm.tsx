import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  firstOption,
  secondOption,
  otherInput,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>
      <Typography variant="h6">Confirm Submission</Typography>
    </DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to submit the following details?
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>
          <strong>Category:</strong> {firstOption}
        </Typography>
        <Typography>
          <strong>Level:</strong>{" "}
          {secondOption === "others" ? otherInput : secondOption}
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="error" variant="outlined">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" variant="contained">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
