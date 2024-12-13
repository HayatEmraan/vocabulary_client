/* eslint-disable @typescript-eslint/no-explicit-any */
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
import VocabularyProgress from "./vocabularyCmp/VocabularyProgress";

type Props = {
  children: React.ReactNode;
  vocab: any;
};

const ContentPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  overflowY: "auto",
}));

const ELearningVideoPage = ({ vocab, children }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeSection, setActiveSection] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        <Grid item xs={12} md={8}>
          {children}
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
              {vocab.map((section: any, index: number) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    LinkComponent={"a"}
                    href={` ${section?.lessonId?._id}/${section._id}`}
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
                      primary={section.word}
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
