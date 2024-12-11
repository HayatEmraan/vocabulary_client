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
  TablePagination,
  TextField,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Collapse,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaEdit,
  FaTrash,
  FaSort,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaUserShield,
  FaUserCheck,
} from "react-icons/fa";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "70vh",
  margin: "20px 0",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
  maxWidth: "400px",
}));

const DetailBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
}));

const StyledCard = styled(Card)(({ theme }) => ({
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

const UserManagementTable = () => {
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

  const activeUsers = mockUsers.filter(
    (user) => user.status === "Active"
  ).length;
  const adminUsers = mockUsers.filter((user) => user.role === "Admin").length;
  const regularUsers = mockUsers.filter((user) => user.role === "User").length;

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
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <FaUserCheck size={24} color="#28a745" />
            <CardContent>
              <Typography variant="h6" component="div">
                Active Users
              </Typography>
              <Typography textAlign={"center"} variant="h4" color="primary">
                {activeUsers}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <FaUserShield size={24} color="#007bff" />
            <CardContent>
              <Typography variant="h6" component="div">
                Admin Users
              </Typography>
              <Typography variant="h4" color="primary">
                {adminUsers}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <FaUsers size={24} color="#6c757d" />
            <CardContent>
              <Typography variant="h6" component="div">
                Regular Users
              </Typography>
              <Typography variant="h4" color="primary">
                {regularUsers}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <SearchField
        label="Search users"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name or email"
        aria-label="Search users"
      />
      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="user management table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {["id", "name", "email", "role"].map((header) => (
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
            {paginatedData.map((user) => (
              <React.Fragment key={user.id}>
                <TableRow hover>
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(user.id)}
                      aria-label="expand row">
                      {expandedRow === user.id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit user">
                      <IconButton
                        onClick={() => handleEdit(user.id)}
                        aria-label={`Edit user ${user.name}`}
                        color="primary">
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user">
                      <IconButton
                        onClick={() => handleDelete(user.id)}
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
                    <Collapse
                      in={expandedRow === user.id}
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
