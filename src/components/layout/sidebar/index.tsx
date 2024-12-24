import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  Toolbar,
  Icon,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { FaTasks } from "react-icons/fa";
import { FaBuysellads } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}
const studentItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LuLayoutDashboard size={20} />,
  },
];
const teacherItems = [
  { name: "Quizzes", path: "/quizzes", icon: <FaTasks size={20} /> },
  {
    name: "Announcements",
    path: "/announcements",
    icon: <FaBuysellads size={20} />,
  },
];
const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const userInfo = JSON.parse(localStorage.getItem("anyware-user") || "{}");
  const renderItems = userInfo.role === "USER" ? studentItems : teacherItems;
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "linear-gradient(45deg, #035c7f 30%, #026873 90%)", // Gradient background
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <Toolbar />
      <List>
        {renderItems.map((item) => (
          <ListItemButton key={item.name}>
            <Link className="side-links" to={item.path}>
              <Icon>{item.icon}</Icon> {item.name}
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
