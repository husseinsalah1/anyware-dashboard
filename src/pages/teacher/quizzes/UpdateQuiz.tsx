import CustomInput from "../../../components/input";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import { fetchQuiz, updateQuiz } from "../../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { UpdateQuizSchema } from "../../../validations/quiz.validation";
import { IQuiz } from "./../../../interfaces/quiz";
import CustomButton from "../../../components/button";

const UpdateQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchQuiz(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (values: IQuiz) => {
    if (id) {
      const resultAction = await dispatch(updateQuiz({ id, data: values }));
      if (updateQuiz.fulfilled.match(resultAction)) {
        navigate(`/quizzes/${id}`);
      }
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!quiz) {
    return <Typography>No quiz found</Typography>;
  }

  const initialValues: IQuiz = {
    title: quiz.title,
    description: quiz.description,
    subject: quiz.subject,
    semester: quiz.semester,
    totalMarks: quiz.totalMarks,
    questions: quiz.questions,
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Quiz
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateQuizSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values }) => (
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
                      <Box key={index} sx={{ mb: 4 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <CustomInput
                              name={`questions.${index}.question`}
                              label={`Question ${index + 1}`}
                              placeholder="Enter question"
                            />
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
                                    label="Add Option"
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
                          <Grid item xs={12}>
                            <CustomButton
                              variant="outlined"
                              startIcon={<MdRemoveCircle />}
                              onClick={() => remove(index)}
                              sx={{ mt: 2 }}
                              label="Remove Question"
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
                <CustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  label="Update Quiz"
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default UpdateQuiz;
