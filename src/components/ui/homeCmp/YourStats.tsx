/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const Charts = ({ stats }: any) => {
  const theme = useTheme();
  const { lesson, vocab } = stats;

  const combinedData = (() => {
    const lessonMap = new Map<string, number>();
    const vocabMap = new Map<string, number>();

    lesson?.forEach((item: any) => {
      const formattedDate = moment(item.date, "YYYY MM DD").format(
        "YYYY-MM-DD"
      );
      lessonMap.set(formattedDate, item.count);
    });

    vocab?.forEach((item: any) => {
      const formattedDate = moment(item.date, "YYYY MM DD").format(
        "YYYY-MM-DD"
      );
      vocabMap.set(formattedDate, item.count);
    });

    const allDates = new Set<string>([...lessonMap.keys(), ...vocabMap.keys()]);

    return Array.from(allDates).map((date) => ({
      date,
      lessonCount: lessonMap.get(date) || 0,
      vocabularyCount: vocabMap.get(date) || 0,
    }));
  })();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
          }}>
          <Typography variant="body2">Date: {label}</Typography>
          <Typography variant="body2" color="primary">
            Lessons: {payload[0].value}
          </Typography>
          <Typography variant="body2" color="secondary">
            Vocabulary: {payload[1].value}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(2),
          minHeight: "300px",
        }}
        role="region"
        aria-label="Combined Statistics Chart">
        <Typography variant="h6" gutterBottom align="center">
          Combined Learning Statistics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={combinedData}
            margin={{
              top: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="lessonCount"
              fill={theme.palette.primary.main}
              name="Lesson Count"
            />
            <Line
              type="monotone"
              dataKey="vocabularyCount"
              name="Vocabulary Count"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Charts;
