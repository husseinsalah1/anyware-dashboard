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

interface FormValues {
  title: string;
  description: string;
  createdBy: string;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  createdBy: "67673d1bef20ef1a563e746b",
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

  const onSubmit = async (values: FormValues) => {
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add Announcement
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddAnnouncement;
