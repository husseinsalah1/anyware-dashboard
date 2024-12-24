import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import { IoMdMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slice/auth.slice";
import { AppDispatch } from "../../../redux/store";

interface NavbarProps {
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const userInfo = localStorage.getItem("anyware-user");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - 240px)`,
        ml: isMobile ? 0 : `240px`,
      }}
      style={{
        background: "#026873",
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <IoMdMenu />
          </IconButton>
        )}

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Welcome {user?.name || "Welcome User"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
