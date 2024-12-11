import React from "react";
import { Box, Button, Typography } from "@mui/material";

const PremiumCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}>
      {/* Text Section */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Learn Even More!
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Unlock premium features only for <strong>$9.99 per month</strong>.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 1,
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#333" },
          }}>
          Go Premium
        </Button>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1728670001843-8233c4371d13?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
        alt="Lightbulb in hand"
        sx={{
          height: 170,
          width: 170,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default PremiumCard;
