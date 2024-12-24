import React from "react";
import { Box, Typography, Avatar, Paper, Grid } from "@mui/material";
import moment from "moment";
import { IAnnouncement } from "../../../interfaces/announcement";

const CardAnnouncement: React.FC<IAnnouncement> = ({
  title,
  description,
  //   createdBy,
  createdAt,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "8px 0",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar sx={{ bgcolor: "#035c7f" }}>{"Hussein".charAt(0)}</Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="body2" color="text.secondary">
            {"Hussein"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(createdAt).format("DD MMM YYYY")}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CardAnnouncement;
