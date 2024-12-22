import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Link,
  IconButton,
  TextField,
  TablePagination,
  Grid,
} from "@mui/material";
import { fetchQuizzes, deleteQuiz } from "../../redux/slice/quiz.slice";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Quizzes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { quizzes, loading, error } = useSelector(
    (state: RootState) => state.quizzes
  );

  const [searchTitle, setSearchTitle] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleQuizClick = (id: string) => {
    navigate(`/quizzes/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteQuiz(id));
  };

  const handleUpdate = (id: string) => {
    navigate(`/quizzes/update/${id}`);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Search by title: ${searchTitle}, subject: ${searchSubject}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      quiz.subject.toLowerCase().includes(searchSubject.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quizzes
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Title"
            variant="outlined"
            fullWidth
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Subject"
            variant="outlined"
            fullWidth
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton onClick={handleSearch} sx={{ ml: 1 }}>
            <FaSearch />
          </IconButton>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 440, overflowY: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Total Marks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredQuizzes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((quiz) => (
                    <TableRow key={quiz._id} style={{ cursor: "pointer" }}>
                      <TableCell>
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => handleQuizClick(quiz._id)}
                        >
                          {quiz.title}
                        </Link>
                      </TableCell>
                      <TableCell>{quiz.description}</TableCell>
                      <TableCell>{quiz.subject}</TableCell>
                      <TableCell>{quiz.semester}</TableCell>
                      <TableCell>{quiz.totalMarks}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleUpdate(quiz._id)}>
                          <MdEditSquare />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(quiz._id)}>
                          <MdDeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredQuizzes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default Quizzes;
