"use client";

import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaBook, FaCheckCircle } from "react-icons/fa";
import Vocabulary from "./vocabularyCmp/Vocabulary";
import VocabularyProgress from "./vocabularyCmp/VocabularyProgress";

const ContentPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  overflowY: "auto",
}));

const ELearningVideoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeSection, setActiveSection] = useState(0);

  const courseContent = [
    {
      title: "Introduction to the Course",
      duration: "10:00",
      completed: true,
    },
    {
      title: "Basic Concepts",
      duration: "15:30",
      completed: true,
    },
    {
      title: "Advanced Topics",
      duration: "20:15",
      completed: false,
    },
    {
      title: "Practical Examples",
      duration: "25:45",
      completed: false,
    },
    {
      title: "Final Project Overview",
      duration: "18:20",
      completed: false,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        <Grid item xs={12} md={8}>
          <Vocabulary />
        </Grid>

        <Grid item xs={12} md={4} sx={{ height: isMobile ? "auto" : "100%" }}>
          <VocabularyProgress />
          <ContentPaper>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}>
              <FaBook style={{ marginRight: 8 }} />
              Lesson Contents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {courseContent.map((section, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    selected={activeSection === index}
                    onClick={() => setActiveSection(index)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      "&.Mui-selected": {
                        backgroundColor: "primary.light",
                      },
                    }}>
                    <ListItemIcon>
                      <FaCheckCircle
                        color={
                          section.completed
                            ? theme.palette.success.main
                            : theme.palette.text.disabled
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={section.title}
                      secondary={`Duration: ${section.duration}`}
                      primaryTypographyProps={{
                        fontWeight: activeSection === index ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ContentPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ELearningVideoPage;
