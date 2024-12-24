import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { fetchQuizzes, deleteQuiz } from "../../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import CustomTable from "../../../components/table";
import Confirmation from "../../../components/confirmation";
import Loading from "../../../components/loading";

const Quizzes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { quizzes, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );
  const [open, setOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    setSelectedQuizId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedQuizId) {
      dispatch(deleteQuiz(selectedQuizId));
      setOpen(false);
      setSelectedQuizId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedQuizId(null);
  };

  const handleUpdate = (id: string) => {
    navigate(`/quizzes/update/${id}`);
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
          onClick={() => handleUpdate(quiz._id)}
          style={{ cursor: "pointer", marginRight: 8 }}
          size={20}
          color="#035c7f"
        />
        <MdDeleteForever
          onClick={() => handleDelete(quiz._id)}
          style={{ cursor: "pointer" }}
          size={22}
          color="#035c7f"
        />
      </>
    ),
  }));
  const handleAddNew = () => {
    navigate("/quizzes/create");
  };
  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            width: "100%",
            height: "100%",
          }}
        >
          <Loading />
        </Box>
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
      <Confirmation
        open={open}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
};

export default Quizzes;
