/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import "./style.css"; // Import the CSS file

interface InputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  rtl?: boolean;
  style?: any;
}

const CustomInput: React.FC<InputProps> = ({
  name,
  placeholder,
  multiline = false,
  rtl = false,
  style,
  type = "text",
  label,
}) => {
  return (
    <div className="custom-input-container">
      <Field
        name={name}
        as={TextField}
        placeholder={placeholder}
        type={type}
        label={label}
        multiline={multiline}
        rows={multiline ? 4 : undefined}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            direction: rtl ? "rtl" : "ltr",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "blue",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "blue",
          },
        }}
        className={`${style?.field_input} rounded-md shadow-sm ${
          rtl ? "text-right" : ""
        }`}
      />
      {/* Display any error message below the input */}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default CustomInput;
