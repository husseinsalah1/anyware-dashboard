/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import {
  fetchAnnouncements,
  deleteAnnouncement,
} from "../../../redux/slice/announcement.slice";
import { RootState, AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import CustomTable from "../../../components/table";
import Confirmation from "../../../components/confirmation";
import Loading from "../../../components/loading";

const Announcements: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { announcements, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );
  const [open, setOpen] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    setSelectedAnnouncementId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAnnouncementId) {
      dispatch(deleteAnnouncement(selectedAnnouncementId));
      setOpen(false);
      setSelectedAnnouncementId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedAnnouncementId(null);
  };

  const handleUpdate = (id: string) => {
    navigate(`/announcements/update/${id}`);
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
          size={20}
          color="#035c7f"
        />
        <MdDeleteForever
          size={22}
          color="#035c7f"
          onClick={() => handleDelete(announcement._id)}
          style={{ cursor: "pointer" }}
        />
      </>
    ),
  }));

  const handleAddNew = () => {
    navigate("/announcements/create");
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
          title="Announcements"
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

export default Announcements;
