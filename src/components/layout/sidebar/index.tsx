import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}
const teacherItems = [
  { name: "Quizzes", path: "/quizzes" },
  { name: "Announcements", path: "/announcements" },
];
const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <Toolbar />
      <List>
        {teacherItems.map((item) => (
          <ListItemButton key={item.name}>
            <Link className="side-links" to={item.path}>
              {item.name}
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
