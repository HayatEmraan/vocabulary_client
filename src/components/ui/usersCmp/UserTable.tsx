"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Collapse,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaEdit,
  FaTrash,
  FaSort,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import CtmSearch from "../../common/Search";
import CtmButton from "../../common/Button";
import moment from "moment";

const StyledTableContainer = styled(TableContainer)(() => ({
  maxHeight: "70vh",
  margin: "20px 0",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const DetailBox = styled(Box)(() => ({
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
}));

type Props = {
  _id: string;
  name: string;
  email: string;
  password: string;
  photoURL: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type userProps = {
  users: Props[];
  children: React.ReactNode;
};

const UserManagementTable = ({ users, children }: userProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      createdAt: "2023-01-15",
      status: "Active",
      description: "Senior system administrator with full access rights",
      lastLogin: "2024-01-20 10:30 AM",
      department: "IT Operations",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      createdAt: "2023-02-20",
      status: "Active",
      description: "Content writer for marketing department",
      lastLogin: "2024-01-19 03:45 PM",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "Manager",
      createdAt: "2023-03-10",
      status: "Away",
      description: "Project manager for development team",
      lastLogin: "2024-01-18 09:15 AM",
      department: "Development",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.b@example.com",
      role: "User",
      createdAt: "2023-04-05",
      status: "Inactive",
      description: "Human resources coordinator",
      lastLogin: "2024-01-15 02:20 PM",
      department: "HR",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.w@example.com",
      role: "Admin",
      createdAt: "2023-05-12",
      status: "Active",
      description: "Network security specialist",
      lastLogin: "2024-01-20 11:45 AM",
      department: "Security",
    },
    {
      id: 6,
      name: "Sarah Davis",
      email: "sarah.d@example.com",
      role: "User",
      createdAt: "2023-06-18",
      status: "Active",
      description: "Financial analyst",
      lastLogin: "2024-01-19 04:30 PM",
      department: "Finance",
    },
    {
      id: 7,
      name: "James Miller",
      email: "james.m@example.com",
      role: "Manager",
      createdAt: "2023-07-22",
      status: "Active",
      description: "Sales team leader",
      lastLogin: "2024-01-20 09:00 AM",
      department: "Sales",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      role: "User",
      createdAt: "2023-08-30",
      status: "Active",
      description: "Customer support representative",
      lastLogin: "2024-01-19 01:15 PM",
      department: "Support",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Editing user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting user with ID: ${id}`);
  };

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const sortedAndFilteredData = mockUsers
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  const paginatedData = sortedAndFilteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* Status Cards */}
      {children}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <CtmButton />

        <CtmSearch
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          placeholder="Search by name or email"
          ariaLabel="Search users"
        />
      </Box>

      <StyledTableContainer>
        <Table stickyHeader aria-label="user management table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {["id", "name", "email", "status", "role"].map((header) => (
                <TableCell
                  key={header}
                  onClick={() => handleSort(header)}
                  style={{ cursor: "pointer" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                    <FaSort style={{ marginLeft: "5px" }} />
                  </Box>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ userId, adminId, ...user }) => (
              <React.Fragment key={userId._id}>
                <TableRow hover>
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(user._id)}
                      aria-label="expand row">
                      {expandedRow === user._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{userId._id?.slice(0, 5)}</TableCell>
                  <TableCell>{userId.name}</TableCell>
                  <TableCell>{userId.email}</TableCell>
                  <TableCell
                    sx={{
                      color: userId.isActive ? "green" : "red",
                      fontWeight: "bold",
                    }}>
                    {userId.isActive ? "Active" : "Blocked"}
                  </TableCell>
                  <TableCell>{userId.role}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit user">
                      <IconButton
                        onClick={() => handleEdit(user._id)}
                        aria-label={`Edit user ${user.name}`}
                        color="primary">
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user">
                      <IconButton
                        onClick={() => handleDelete(user._id)}
                        aria-label={`Delete user ${user.name}`}
                        color="error">
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}>
                    {/* <Collapse
                      in={expandedRow === user._id}
                      timeout="auto"
                      unmountOnExit>
                      <DetailBox>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary">
                              Created At
                            </Typography>
                            <Typography variant="body1">
                              {user.createdAt}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary">
                              Status
                            </Typography>
                            <Typography variant="body1">
                              {user.status}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary">
                              Department
                            </Typography>
                            <Typography variant="body1">
                              {user.department}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary">
                              Last Login
                            </Typography>
                            <Typography variant="body1">
                              {user.lastLogin}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary">
                              Description
                            </Typography>
                            <Typography variant="body1">
                              {user.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </DetailBox>
                    </Collapse> */}

                    <Collapse
                      in={expandedRow === user._id}
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
                              {moment(user.updatedAt).format("LLL")}
                            </Typography>
                            <Typography variant="subtitle2">
                              Updated By: {adminId?.name ?? "N/A"}
                            </Typography>
                            <Typography variant="subtitle2">
                              Update Reason: {user.reason}
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
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedAndFilteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserManagementTable;
