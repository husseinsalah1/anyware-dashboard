import { Typography, Paper } from "@mui/material";
import "./style.css";
import CustomButton from "../../../../components/button";
const ExamTime = () => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, marginBottom: 3 }}
      className="exam-time"
    >
      <Typography variant="h4" color="#fff" gutterBottom>
        EXAMS TIME
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here we are. Are you ready to fight? Don't worry, we prepared some tips
        to be ready for your exams.
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        "Nothing happens until something moves" - Albert Einstein
      </Typography>

      <CustomButton
        label="View More"
        style={{
          backgroundColor: "#fff !important",
          color: "#000",
          marginTop: "1rem",
          padding: "0.3rem 2rem",
        }}
      />
    </Paper>
  );
};

export default ExamTime;
