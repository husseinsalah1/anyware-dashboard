import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import CustomInput from "../../../components/input";
import { createQuiz } from "../../../redux/slice/quiz.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "./../../../interfaces/quiz";
import { AddQuizSchema } from "../../../validations/quiz.validation";
import CustomButton from "../../../components/button";

const initialValues: IQuiz = {
  title: "",
  description: "",
  subject: "",
  semester: "",
  totalMarks: 0,
  questions: [],
};

const AddQuiz: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.quizzes);
  const userInfo = JSON.parse(localStorage.getItem("anyware-user") || "{}");

  const onSubmit = async (values: IQuiz) => {
    values.createdBy = userInfo._id;
    const resultAction = await dispatch(
      createQuiz({
        data: values,
      })
    );
    if (createQuiz.fulfilled.match(resultAction)) {
      navigate("/quizzes");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Quiz
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
          validationSchema={AddQuizSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomInput
                    name="title"
                    label="Quiz Title"
                    placeholder="Enter quiz title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    name="description"
                    label="Quiz Description"
                    placeholder="Enter quiz description"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    name="subject"
                    label="Subject"
                    placeholder="Enter quiz subject"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    name="semester"
                    label="Semester"
                    placeholder="Enter quiz semester"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    name="totalMarks"
                    label="Total Marks"
                    placeholder="Enter total marks"
                    type="number"
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" gutterBottom>
                Questions
              </Typography>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((question, index) => (
                      <Box key={index} sx={{ mb: 4, position: "relative" }}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <CustomInput
                              name={`questions.${index}.question`}
                              label={`Question ${index + 1}`}
                              placeholder="Enter question"
                            />
                            <IconButton
                              onClick={() => remove(index)}
                              sx={{ ml: 1 }}
                            >
                              <MdRemoveCircle />
                            </IconButton>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                              Options
                            </Typography>
                            <FieldArray name={`questions.${index}.options`}>
                              {({ push: pushOption, remove: removeOption }) => (
                                <div>
                                  {question.options.map(
                                    (_option, optionIndex) => (
                                      <Box
                                        key={optionIndex}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mb: 2,
                                        }}
                                      >
                                        <CustomInput
                                          name={`questions.${index}.options.${optionIndex}`}
                                          placeholder={`Option ${
                                            optionIndex + 1
                                          }`}
                                        />
                                        <IconButton
                                          onClick={() =>
                                            removeOption(optionIndex)
                                          }
                                          disabled={
                                            question.options.length <= 1
                                          }
                                          sx={{ ml: 1 }}
                                        >
                                          <MdRemoveCircle />
                                        </IconButton>
                                      </Box>
                                    )
                                  )}
                                  <CustomButton
                                    variant="outlined"
                                    startIcon={<MdAddCircle />}
                                    onClick={() => pushOption("")}
                                    sx={{ mt: 2 }}
                                    label={"Add Option"}
                                  />
                                </div>
                              )}
                            </FieldArray>
                          </Grid>
                          <Grid item xs={12}>
                            <CustomInput
                              name={`questions.${index}.correctAnswer`}
                              label="Correct Answer"
                              placeholder="Enter correct answer"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    <CustomButton
                      variant="outlined"
                      startIcon={<MdAddCircle />}
                      onClick={() =>
                        push({ question: "", options: [""], correctAnswer: "" })
                      }
                      sx={{ mt: 2 }}
                      label="Add Question"
                    />
                  </div>
                )}
              </FieldArray>
              <Box sx={{ mt: 4 }}>
                <CustomButton type="submit" label="Add Quiz" />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddQuiz;
