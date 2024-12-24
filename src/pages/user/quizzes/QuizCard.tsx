import React from "react";
import CustomButton from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { QuizCardProps } from "../../../interfaces/quiz";

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`./start-quiz/${quiz._id}`);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {quiz.title}
          </Typography>
        }
        secondary={
          <>
            <Typography variant="body2" color="text.secondary">
              Subject: {quiz.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {quiz.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Semester: {quiz.semester}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Marks: {quiz.totalMarks}
            </Typography>
            <CustomButton
              label="Start Quiz"
              variant="outlined"
              sx={{ marginTop: 1 }}
              onClick={handleStartQuiz}
            />
          </>
        }
      />
    </ListItem>
  );
};

export default QuizCard;
