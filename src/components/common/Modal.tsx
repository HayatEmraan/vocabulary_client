/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginBottom: theme.spacing(2),
}));

const Modal = (props: any) => {
  const { open, onClose, firstOption, secondOption } = props;
  const { onOtherInputChange, otherInput, onSubmit } = props;
  const { onFirstOptionChange, onSecondOptionChange } = props;

  const firstOptions = [
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Data Science",
  ];

  const secondOptions = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "others",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
        },
      }}>
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Select Your Preferences
        </Typography>
      </DialogTitle>

      <DialogContent>
        <StyledFormControl fullWidth>
          <InputLabel>Select Category</InputLabel>
          <Select
            value={firstOption}
            label="Select Category"
            onChange={onFirstOptionChange}>
            {firstOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <InputLabel>Select Level</InputLabel>
          <Select
            value={secondOption}
            label="Select Level"
            onChange={onSecondOptionChange}>
            {secondOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        {secondOption === "others" && (
          <TextField
            fullWidth
            label="Please specify"
            variant="outlined"
            value={otherInput}
            onChange={onOtherInputChange}
            error={secondOption === "others" && !otherInput}
            helperText={
              secondOption === "others" && !otherInput
                ? "Please specify your level"
                : ""
            }
            sx={{ mt: 2 }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={
            !firstOption ||
            !secondOption ||
            (secondOption === "others" && !otherInput)
          }>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
