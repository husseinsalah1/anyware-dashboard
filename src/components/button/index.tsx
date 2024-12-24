import React from "react";
import { Button, ButtonProps } from "@mui/material";
import "./style.css"; // Import the CSS file for additional styles

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button {...props} className="custom-button">
      {label}
    </Button>
  );
};

export default CustomButton;
