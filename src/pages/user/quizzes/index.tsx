import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, List, Divider } from "@mui/material";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchQuizzes } from "../../../redux/slice/quiz.slice";
import QuizCard from "./QuizCard";
import Loading from "../../../components/loading";

const UQuizzes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading } = useSelector((state: RootState) => state.quizzes);

  useEffect(() => {
    if (!loading && quizzes.length === 0) {
      dispatch(fetchQuizzes());
    }
  }, [dispatch, loading, quizzes.length]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        {quizzes.map((quiz, index) => (
          <React.Fragment key={quiz._id}>
            <QuizCard quiz={quiz} />
            {index < quizzes.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default UQuizzes;
