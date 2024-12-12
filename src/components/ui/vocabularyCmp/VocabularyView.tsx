/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
  TableSortLabel,
  Box,
  Tooltip,
  Grid,
  Typography,
  Collapse,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import CtmButton from "../../common/Button";
import CtmSearch from "../../common/Search";
import moment from "moment";

type Props = {
  lessons: any[];
  children: React.ReactNode;
};

const VocabularyTable = ({ lessons, children }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const mockData = [
    {
      id: 1,
      name: "John Doe",
      number: "123-456-7890",
      createdBy: "Admin User",
      createdLesson: 15,
      completedLesson: 12,
      editedLesson: 5,
      lastEdited: "2024-01-15",
      updatedBy: "Sarah Admin",
      updateReason: "Content improvement",
      lessonDetails: [
        { id: 1, title: "Math Lesson", status: "Completed" },
        { id: 2, title: "Science Lesson", status: "In Progress" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "987-654-3210",
      createdBy: "Super Admin",
      createdLesson: 8,
      completedLesson: 8,
      editedLesson: 3,
      lastEdited: "2024-01-14",
      updatedBy: "John Admin",
      updateReason: "Grammar corrections",
      lessonDetails: [
        { id: 3, title: "History Lesson", status: "Completed" },
        { id: 4, title: "English Lesson", status: "Pending Review" },
      ],
    },
    {
      id: 3,
      name: "Mike Johnson",
      number: "555-555-5555",
      createdBy: "Content Manager",
      createdLesson: 20,
      completedLesson: 18,
      editedLesson: 7,
      lastEdited: "2024-01-13",
      updatedBy: "Emily Editor",
      updateReason: "Format standardization",
      lessonDetails: [
        { id: 5, title: "Geography Lesson", status: "Completed" },
        { id: 6, title: "Art Lesson", status: "In Review" },
      ],
    },
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };


  const filteredData = mockData
    .filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort(getComparator(order, orderBy));

  const handleEdit = (id) => {
    console.log(`Edit item ${id}`);
  };

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const headers = [
    { id: "id", label: "ID", sortable: true },
    { id: "word", label: "Word", sortable: true },
    { id: "pronunciation", label: "Pronunciation", sortable: true },
    { id: "meaning", label: "Meaning", sortable: true },
    { id: "actions", label: "Actions", sortable: false },
  ];

  console.log(lessons);
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vocabulary Management
      </Typography>
      {children}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <CtmButton link="/vocabulary/create" title="Add Vocabulary" />

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
                <TableCell
                  key={header.id}
                  sortDirection={orderBy === header.id ? order : false}>
                  {header.sortable ? (
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : "asc"}
                      onClick={() => handleRequestSort(header.id)}>
                      {header.label}
                    </TableSortLabel>
                  ) : (
                    header.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ lessonId, adminId, ...vocab }) => (
                <React.Fragment key={vocab._id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandRow(vocab._id)}>
                        {expandedRow === vocab._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{vocab._id?.slice(0, 5)}</TableCell>
                    <TableCell>{vocab.word}</TableCell>
                    <TableCell>{vocab.meaning}</TableCell>
                    <TableCell>{vocab.pronunciation}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEdit(vocab.id)}
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
                        in={expandedRow === vocab._id}
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
                                {moment(vocab.updatedAt).format("LLL")}
                              </Typography>
                              <Typography variant="subtitle2">
                                Created By: {adminId?.name}
                              </Typography>
                              <Typography variant="subtitle2">
                                Belong to Lesson: {lessonId?.name}
                              </Typography>
                              <Typography variant="subtitle2">
                                Update Reason: {vocab.reason}
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default VocabularyTable;
