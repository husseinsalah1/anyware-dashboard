import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = React.useState(!isMobile);
  const token = localStorage.getItem("anyware-token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  if (!token) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: "50px",
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
