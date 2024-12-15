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
  TablePagination,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Collapse,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CtmSearch from "../../common/Search";
import { FaRegUser } from "react-icons/fa";

import { MdOutlineAdminPanelSettings, MdOutlineBlock } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";

import moment from "moment";
import Confirmation from "@/components/common/Confirm";
import { userUpdateApi } from "@/services/adminApi/users.api";
import CtmSnackbar from "@/components/common/Snackbar";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const StyledTableContainer = styled(TableContainer)(() => ({
  maxHeight: "70vh",
  margin: "20px 0",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

type userProps = {
  users: any[];
  children: React.ReactNode;
};

const UserManagementTable = ({ users, children }: userProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [alert, setAlert] = useState(false);

  const [snack, setSnack] = useState({
    severity: "",
    title: "",
  });

  const navigate = useRouter();

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleEdit = async (id: string, role: string) => {
    if (role === "user") {
      setUserInfo({
        id,
        role: "admin",
      });
    } else {
      setUserInfo({
        id,
        role: "user",
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (userInfo?.role) {
      const rs =
        userInfo?.role === "admin" ? "promote to admin" : "demote to user";
      const user = await userUpdateApi({
        id: userInfo?.id,
        role: userInfo?.role,
        reason: rs,
      });

      if (user?.success) {
        setAlert(true);
        setSnack({ severity: "success", title: user.message });
      } else {
        setAlert(true);
        setSnack({
          severity: "error",
          title: user.message,
        });
      }
    } else {
      const rs = !userInfo?.isActive ? "blocked by admin" : "unblocked";
      const user = await userUpdateApi({
        id: userInfo?.id,
        isActive: userInfo?.isActive,
        reason: rs,
      });

      if (user?.success) {
        setAlert(true);
        setSnack({ severity: "success", title: user.message });
      } else {
        setAlert(true);
        setSnack({
          severity: "error",
          title: user.message,
        });
      }
    }

    setOpen(false);
    navigate.refresh();
  };

  const handleBlock = (id: string, active: boolean) => {
    setUserInfo({
      id,
      isActive: !active,
    });

    setOpen(true);
  };

  const handleExpandRow = (id: any) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const paginatedData = users.slice(
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
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}>
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
                <TableCell key={header}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </Box>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(({ userId, adminId, ...user }) => (
              <React.Fragment key={user?._id}>
                <TableRow hover>
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(user?._id)}
                      aria-label="expand row">
                      {expandedRow === user?._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{userId?._id?.slice(0, 5)}</TableCell>
                  <TableCell>{userId?.name}</TableCell>
                  <TableCell>{userId?.email}</TableCell>
                  <TableCell
                    sx={{
                      color: userId?.isActive ? "green" : "red",
                      fontWeight: "bold",
                    }}>
                    {userId?.isActive ? "Active" : "Blocked"}
                  </TableCell>
                  <TableCell>{userId?.role}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={`${
                        userId?.role === "admin" ? "Make User" : "Make Admin"
                      }`}>
                      <IconButton
                        onClick={() => handleEdit(userId?._id, userId?.role)}
                        aria-label={`user ${user?.name}`}
                        color="primary">
                        {userId?.role === "admin" ? (
                          <MdOutlineAdminPanelSettings />
                        ) : (
                          <FaRegUser size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={`${
                        userId?.isActive ? "Block User" : "Unblock User"
                      }`}>
                      <IconButton
                        onClick={() =>
                          handleBlock(userId?._id, userId?.isActive)
                        }
                        aria-label={`Delete user ${user?.name}`}
                        color="error">
                        {!userId?.isActive ? (
                          <MdOutlineBlock />
                        ) : (
                          <HiOutlineBookOpen />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}>
                    <Collapse
                      in={expandedRow === user?._id}
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
                              {moment(user?.updatedAt).format("LLL")}
                            </Typography>
                            <Typography variant="subtitle2">
                              Updated By: {adminId?.name ?? "N/A"}
                            </Typography>
                            <Typography variant="subtitle2">
                              Update Reason: {user?.reason}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Confirmation
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
      <CtmSnackbar snack={snack} open={alert} setOpen={setAlert} />
    </Box>
  );
};

export default dynamic(() => Promise.resolve(UserManagementTable), {
  ssr: false,
});
