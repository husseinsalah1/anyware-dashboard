import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchQuizzes, deleteQuiz } from "../../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import CustomTable from "../../../components/table";

const Quizzes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { quizzes, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteQuiz(id));
  };

  const handleUpdate = (id: string) => {
    navigate(`/quizzes/update/${id}`);
  };

  const handleAddNew = () => {
    navigate("/quizzes/create");
  };
  const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "subject", label: "Subject", minWidth: 100 },
    { id: "semester", label: "Semester", minWidth: 100 },
    { id: "totalMarks", label: "Total Marks", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const rows = quizzes.map((quiz) => ({
    ...quiz,
    actions: (
      <>
        <MdEditSquare
          size={20}
          color="#035c7f"
          onClick={() => handleUpdate(quiz._id)}
          style={{ cursor: "pointer", marginRight: 8 }}
        />
        <MdDeleteForever
          size={22}
          color="#035c7f"
          onClick={() => handleDelete(quiz._id)}
          style={{ cursor: "pointer" }}
        />
      </>
    ),
  }));

  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows}
          title="Quizzes"
          onAddNew={handleAddNew}
        />
      )}
    </Box>
  );
};

export default Quizzes;
