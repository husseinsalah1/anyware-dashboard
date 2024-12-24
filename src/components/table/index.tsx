/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center" | "inherit" | "justify";
  backgroundColor?: string;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  title?: string;
  onAddNew?: () => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  rows,
  title,
  onAddNew,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    columns.some((column) =>
      row[column.id]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#035c7f",
              borderBottom: "2px solid",
              borderColor: "#035c7f",
              paddingBottom: 1,
              marginBottom: 2,
            }}
          >
            {title}
          </Typography>
        )}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ marginBottom: 2, width: "300px" }}
        />
      </Box>
      <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "title" ? (
                            <Link
                              to={`/quizzes/${row._id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {value}
                            </Link>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {onAddNew && (
        <Fab
          aria-label="add"
          onClick={onAddNew}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "#026873",
            color: "#fff",
            fontSize: "1.5rem",
          }}
        >
          <IoMdAdd />
        </Fab>
      )}
    </Box>
  );
};

export default CustomTable;
