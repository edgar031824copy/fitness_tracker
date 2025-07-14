import type { FC } from "react";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FitnessCenter,
  Menu as MenuIcon,
  Dashboard,
  History,
} from "@mui/icons-material";

export const Layout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/dashboard" && location.pathname === "/")
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <FitnessCenter sx={{ mr: 1, fontSize: 32 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "1.1rem" : "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => handleNavigate("/dashboard")}
              >
                Fitness Tracker
              </Typography>
            </Box>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => handleNavigate("/dashboard")}
                    selected={isActive("/dashboard")}
                  >
                    <Dashboard sx={{ mr: 1 }} />
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("/history")}
                    selected={isActive("/history")}
                  >
                    <History sx={{ mr: 1 }} />
                    History
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  color="inherit"
                  startIcon={<Dashboard />}
                  onClick={() => handleNavigate("/dashboard")}
                  variant={isActive("/dashboard") ? "outlined" : "text"}
                  sx={{ color: "inherit" }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  startIcon={<History />}
                  onClick={() => handleNavigate("/history")}
                  variant={isActive("/history") ? "outlined" : "text"}
                  sx={{ color: "inherit" }}
                >
                  History
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
