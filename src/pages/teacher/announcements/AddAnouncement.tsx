import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import CustomInput from "../../../components/input";
import { createAnnouncement } from "../../../redux/slice/announcement.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { IAnnouncement } from "../../../interfaces/announcement";
import CustomButton from "../../../components/button";

const initialValues: IAnnouncement = {
  title: "",
  description: "",
};

const AddAnnouncementSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const AddAnnouncement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.announcements
  );
  const userInfo = JSON.parse(localStorage.getItem("anyware-user") || "{}");

  const onSubmit = async (values: IAnnouncement) => {
    values.createdBy = userInfo._id;

    const resultAction = await dispatch(createAnnouncement({ data: values }));
    if (createAnnouncement.fulfilled.match(resultAction)) {
      navigate("/announcements");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Announcement
        </Typography>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={AddAnnouncementSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomInput
                    name="title"
                    label="Announcement Title"
                    placeholder="Enter announcement title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    name="description"
                    label="Announcement Description"
                    placeholder="Enter announcement description"
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ mt: 4 }}>
                <CustomButton type="submit" label="Add Announcement" />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddAnnouncement;
