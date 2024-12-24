import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Typography, Paper, CircularProgress, Grid } from "@mui/material";
import {
  fetchAnnouncement,
  updateAnnouncement,
} from "../../../redux/slice/announcement.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import CustomInput from "../../../components/input";
import CustomButton from "../../../components/button";

interface FormValues {
  title: string;
  description: string;
}

const UpdateAnnouncementSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const UpdateAnnouncement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { announcement, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnnouncement(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (values: FormValues) => {
    if (id) {
      const resultAction = await dispatch(
        updateAnnouncement({ id, data: values })
      );
      if (updateAnnouncement.fulfilled.match(resultAction)) {
        navigate(`/announcements`);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!announcement) {
    return <Typography>No announcement found</Typography>;
  }

  const initialValues: FormValues = {
    title: announcement.title,
    description: announcement.description,
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Announcement
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateAnnouncementSchema}
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
              <Box sx={{ mt: 4 }}>
                <CustomButton
                  type="submit"
                  label="Update Announcement"
                  disabled={isSubmitting}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default UpdateAnnouncement;
