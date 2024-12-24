/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  fetchAnnouncements,
  deleteAnnouncement,
} from "../../../redux/slice/announcement.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import CustomTable from "../../../components/table";

const Announcements: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { announcements, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteAnnouncement(id));
  };

  const handleUpdate = (id: string) => {
    navigate(`/announcements/update/${id}`);
  };

  const handleAddNew = () => {
    navigate("/announcements/create");
  };

  const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "createdBy", label: "Created By", minWidth: 100 },
    { id: "createdAt", label: "Created At", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const rows = announcements.map((announcement: any) => ({
    ...announcement,
    createdBy: announcement.createdBy?.name,
    actions: (
      <>
        <MdEditSquare
          onClick={() => handleUpdate(announcement._id)}
          style={{ cursor: "pointer", marginRight: 8 }}
        />
        <MdDeleteForever
          onClick={() => handleDelete(announcement._id)}
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
          title="Announcements"
          onAddNew={handleAddNew}
        />
      )}
    </Box>
  );
};

export default Announcements;
