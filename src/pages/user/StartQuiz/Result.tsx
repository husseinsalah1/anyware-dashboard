import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface LocationState {
  questions: Question[];
  answers: string[];
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = location.state as LocationState;

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Results
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {score} / {questions.length}
      </Typography>
      {questions.map((question, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your Answer: {answers[index]}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Correct Answer: {question.correctAnswer}
          </Typography>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 4 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Result;
