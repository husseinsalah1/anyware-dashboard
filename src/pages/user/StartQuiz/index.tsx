import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuiz } from "../../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import CustomButton from "../../../components/button";

const StartQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuiz(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (quiz) {
      setAnswers(Array(quiz.questions.length).fill(""));
    }
  }, [quiz]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Handle quiz submission logic here
    navigate("/quiz-results", {
      state: { questions: quiz?.questions, answers },
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
    return (
      <Typography color="error" gutterBottom>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Start Quiz
      </Typography>
      <Typography variant="h6" gutterBottom>
        Time Left: {formatTime(timeLeft)}
      </Typography>
      {quiz?.questions.map((question, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          <RadioGroup
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          >
            {question.options.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 4 }}
        label="Submit Quiz"
      />
    </Box>
  );
};

export default StartQuiz;
