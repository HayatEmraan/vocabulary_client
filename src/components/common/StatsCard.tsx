"use client";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  styled,
  Typography,
} from "@mui/material";

const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f8f9fa",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
}));

type Props = {
  number: number;
  title: string;
  children: React.ReactNode;
};

const StatsCard = (props: Props) => {
  const { number, title, children } = props;
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <StyledCard>
        {children}
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography textAlign={"center"} variant="h4" color="primary">
            {number}
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default StatsCard;
