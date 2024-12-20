// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Select,
//   MenuItem,
//   TextField,
//   Box,
//   FormControl,
//   InputLabel,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { IoMdOpen } from "react-icons/io";

// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//   minWidth: 200,
//   marginBottom: theme.spacing(2),
// }));

// const SelectPopup = () => {
//   const [open, setOpen] = useState(false);
//   const [firstOption, setFirstOption] = useState("");
//   const [secondOption, setSecondOption] = useState("");
//   const [otherInput, setOtherInput] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleFirstOptionChange = (event) => {
//     setFirstOption(event.target.value);
//   };

//   const handleSecondOptionChange = (event) => {
//     setSecondOption(event.target.value);
//     if (event.target.value !== "others") {
//       setOtherInput("");
//     }
//   };

//   const handleOtherInputChange = (event) => {
//     setOtherInput(event.target.value);
//   };

//   const handleSubmit = () => {
//     console.log({
//       firstOption,
//       secondOption,
//       otherInput,
//     });
//     handleClose();
//   };

//   const firstOptions = [
//     "Web Development",
//     "Mobile Development",
//     "Cloud Computing",
//     "Data Science",
//   ];

//   const secondOptions = [
//     "Beginner",
//     "Intermediate",
//     "Advanced",
//     "Expert",
//     "others",
//   ];

//   return (
//     <Box>
//       <Button
//         variant="contained"
//         onClick={handleOpen}
//         startIcon={<IoMdOpen />}
//         sx={{ mb: 2 }}>
//         Open Selection Popup
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             padding: 2,
//           },
//         }}>
//         <DialogTitle>
//           <Typography variant="h5" component="div" fontWeight="bold">
//             Select Your Preferences
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <StyledFormControl fullWidth>
//             <InputLabel>Select Category</InputLabel>
//             <Select
//               value={firstOption}
//               label="Select Category"
//               onChange={handleFirstOptionChange}>
//               {firstOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </StyledFormControl>

//           <StyledFormControl fullWidth>
//             <InputLabel>Select Level</InputLabel>
//             <Select
//               value={secondOption}
//               label="Select Level"
//               onChange={handleSecondOptionChange}>
//               {secondOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option.charAt(0).toUpperCase() + option.slice(1)}
//                 </MenuItem>
//               ))}
//             </Select>
//           </StyledFormControl>

//           {secondOption === "others" && (
//             <TextField
//               fullWidth
//               label="Please specify"
//               variant="outlined"
//               value={otherInput}
//               onChange={handleOtherInputChange}
//               error={secondOption === "others" && !otherInput}
//               helperText={
//                 secondOption === "others" && !otherInput
//                   ? "Please specify your level"
//                   : ""
//               }
//               sx={{ mt: 2 }}
//             />
//           )}
//         </DialogContent>

//         <DialogActions sx={{ padding: 2 }}>
//           <Button onClick={handleClose} variant="outlined" color="error">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={
//               !firstOption ||
//               !secondOption ||
//               (secondOption === "others" && !otherInput)
//             }>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default SelectPopup;

import React, { useState } from "react";
import { Button, Box } from "@mui/material";

import { IoMdOpen } from "react-icons/io";
import Modal from "./Modal";
import Confirmation from "./Confirm";

const SelectPopup = () => {
  const [open, setOpen] = useState(false);
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [otherInput, setOtherInput] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFirstOptionChange = (event) => {
    setFirstOption(event.target.value);
  };

  const handleSecondOptionChange = (event) => {
    setSecondOption(event.target.value);
    if (event.target.value !== "others") {
      setOtherInput("");
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherInput(event.target.value);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    console.log({
      firstOption,
      secondOption,
      otherInput,
    });
    setShowConfirmation(false);
    handleClose();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<IoMdOpen />}
        sx={{ mb: 2 }}>
        Open Selection Popup
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        firstOption={firstOption}
        secondOption={secondOption}
        otherInput={otherInput}
        onFirstOptionChange={handleFirstOptionChange}
        onSecondOptionChange={handleSecondOptionChange}
        onOtherInputChange={handleOtherInputChange}
        onSubmit={handleSubmit}
      />

      <Confirmation
        open={showConfirmation}
        onClose={handleCancelConfirmation}
        onConfirm={handleConfirm}
        firstOption={firstOption}
        secondOption={secondOption}
        otherInput={otherInput}
      />
    </Box>
  );
};

export default SelectPopup;
