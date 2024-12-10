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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event: any) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        <ListItem>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Contact" />
        </ListItem>
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
            Vocab
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
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>

            <IconButton onClick={handleUserMenuClick}>
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="User"
              />
            </IconButton>
          </NavItems>
        )}

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}>
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
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

export default Header;
