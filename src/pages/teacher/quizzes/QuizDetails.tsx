import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { fetchQuiz } from "../../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../../redux/store";

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchQuiz(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!quiz) {
    return <Typography>No quiz found</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {quiz.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Subject: {quiz.subject}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Semester: {quiz.semester}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Marks: {quiz.totalMarks}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Questions
        </Typography>
        <List>
          {quiz.questions.map((question, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={`Q${index + 1}: ${question.question}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Options:
                    </Typography>
                    <ul>
                      {question.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ul>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Correct Answer: {question.correctAnswer}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default QuizDetail;
