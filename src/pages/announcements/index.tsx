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
  IconButton,
  TextField,
  TablePagination,
  Grid,
} from "@mui/material";
import {
  fetchAnnouncements,
  deleteAnnouncement,
} from "../../redux/slice/announcement.slice";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Announcements: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { announcements, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );

  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteAnnouncement(id));
  };

  const handleUpdate = (id: string) => {
    navigate(`/announcements/update/${id}`);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Search by title: ${searchTitle}`);
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

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Announcements
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
                  <TableCell>Created By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAnnouncements
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((announcement) => (
                    <TableRow
                      key={announcement._id}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Typography variant="body2">
                          {announcement.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{announcement.description}</TableCell>
                      <TableCell>{announcement.createdBy}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleUpdate(announcement._id)}
                        >
                          <MdEditSquare />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(announcement._id)}
                        >
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
            count={filteredAnnouncements.length}
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

export default Announcements;
