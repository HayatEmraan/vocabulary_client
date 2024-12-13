/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  Tooltip,
  Grid,
  Typography,
  Collapse,
} from "@mui/material";
import { FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import CtmButton from "../../common/Button";
import CtmSearch from "../../common/Search";
import moment from "moment";
import dynamic from "next/dynamic";

type Props = {
  lessons: any[];
  children: React.ReactNode;
};

const LessonTable = ({ lessons, children }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleExpandRow = (id: any) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const headers = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "number", label: "Number" },
    { id: "createdBy", label: "Created By" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lesson Management
      </Typography>
      {children}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <CtmButton link="/lessons/create" title="Add Lesson" />

        <CtmSearch
          searchQuery={searchQuery}
          handleSearch={handleSearchChange}
          placeholder="Search by name..."
          ariaLabel="Search..."
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="statistics table">
          <TableHead>
            <TableRow>
              <TableCell />
              {headers.map((header) => (
                <TableCell key={header.id}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lesson) => (
                <React.Fragment key={lesson._id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandRow(lesson._id)}>
                        {expandedRow === lesson._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{lesson._id?.slice(0, 5)}</TableCell>
                    <TableCell>{lesson.name}</TableCell>
                    <TableCell>{lesson.number}</TableCell>
                    <TableCell
                      sx={{
                        textTransform: "capitalize",
                        color: "success.main",
                      }}>
                      {lesson?.adminId?.name}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          LinkComponent={"a"}
                          href={"/lessons/edit/" + lesson._id}
                          sx={{ color: "success.main" }}>
                          <FaEdit />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}>
                      <Collapse
                        in={expandedRow === lesson._id}
                        timeout="auto"
                        unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Additional Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2">
                                Last Edited:{" "}
                                {moment(lesson.updatedAt).format("LLL")}
                              </Typography>
                              <Typography variant="subtitle2">
                                Updated By:{" "}
                                {lesson?.updatedId?.name ?? "Unknown"}
                              </Typography>
                              <Typography variant="subtitle2">
                                Update Reason: {lesson.reason}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={lessons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default dynamic(() => Promise.resolve(LessonTable), { ssr: false });
