import { Box, Grid, Typography } from "@mui/material";
import ExamTime from "../dashboard/examTime";
import UQuizzes from "../quizzes";
import Announcements from "../announcements";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Welcome Section */}
      <ExamTime />

      <Grid container spacing={3}>
        {/* Announcements Section */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#026873",
              borderBottom: "2px solid",
              borderColor: "#026873",
              paddingBottom: 1,
              marginBottom: 2,
            }}
          >
            Announcements
          </Typography>
          <Announcements />
        </Grid>

        {/* What's Due Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#026873",
              borderBottom: "2px solid",
              borderColor: "#026873",
              paddingBottom: 1,
              marginBottom: 2,
            }}
          >
            Quizzes
          </Typography>
          <UQuizzes />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
