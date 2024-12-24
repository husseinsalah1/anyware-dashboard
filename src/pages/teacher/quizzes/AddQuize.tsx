import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import CustomInput from "../../../components/input";
import { createQuiz } from "../../../redux/slice/quiz.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

interface FormValues {
  title: string;
  description: string;
  subject: string;
  semester: string;
  totalMarks: number;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const initialValues: FormValues = {
  title: "",
  description: "",
  subject: "",
  semester: "",
  totalMarks: 0,
  questions: [],
};

const AddQuizSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  semester: Yup.string().required("Required"),
  totalMarks: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Required"),
      options: Yup.array()
        .of(Yup.string().required("Required"))
        .min(1, "At least one option is required"),
      correctAnswer: Yup.string().required("Required"),
    })
  ),
});

const AddQuiz: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.quizzes);

  const onSubmit = async (values: FormValues) => {
    const resultAction = await dispatch(createQuiz({ data: values }));
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
                                  <Button
                                    variant="outlined"
                                    startIcon={<MdAddCircle />}
                                    onClick={() => pushOption("")}
                                    sx={{ mt: 2 }}
                                  >
                                    Add Option
                                  </Button>
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
                    <Button
                      variant="outlined"
                      startIcon={<MdAddCircle />}
                      onClick={() =>
                        push({ question: "", options: [""], correctAnswer: "" })
                      }
                      sx={{ mt: 2 }}
                    >
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Box sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add Quiz
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddQuiz;
