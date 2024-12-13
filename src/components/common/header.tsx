/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { removeCookies } from "@/utils/cookies";
import Image from "next/image";
import logo from "./logo.svg";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
}));

const NavItems = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const adminMenuItems = [
  { label: "Home", link: "/" },
  { label: "Users", link: "/users" },
  { label: "Lessons", link: "/lessons" },
  { label: "Vocabulary", link: "/vocabulary" },
];

const userMenuItems = [
  { label: "Home", link: "/" },
  { label: "Tutorials", link: "/tutorials" },
];

const Header = ({ user }: { user: any }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event: any) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    await removeCookies();
    navigate.push("/auth/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {user?.role === "admin"
          ? adminMenuItems.map((item) => (
              <ListItem key={item.label}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))
          : userMenuItems.map((item) => (
              <ListItem key={item.label}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        bgcolor: "transparent",
      }}>
      <StyledToolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            color="inherit"
            sx={{
              fontWeight: 600,
            }}>
            <Image src={logo} alt="logo" width={140} />
          </Typography>
        </Box>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        ) : (
          <NavItems>
            {user?.role === "admin"
              ? adminMenuItems.map((item) => (
                  <Button key={item.label} LinkComponent={"a"} href={item.link}>
                    {item.label}
                  </Button>
                ))
              : userMenuItems.map((item) => (
                  <Button key={item.label} LinkComponent={"a"} href={item.link}>
                    {item.label}
                  </Button>
                ))}

            <IconButton onClick={handleUserMenuClick}>
              <Avatar src={user?.photoURL} alt="User" />
            </IconButton>
          </NavItems>
        )}

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}>
          {drawer}
        </Drawer>
      </StyledToolbar>
    </AppBar>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
