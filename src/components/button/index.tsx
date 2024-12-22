import React from "react";
import { Button, ButtonProps } from "@mui/material";
import "./style.css"; // Import the CSS file for additional styles

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button
      {...props}
      className="custom-button"
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        padding: "10px 20px",
        fontSize: "16px",
        "&:hover": {
          backgroundColor: "blue",
          color: "white",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
