import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";

const TableComponent = ({ data, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  useEffect(() => {
    const newImageUrls = {};
    data.forEach((row, index) => {
      if (row.profilePicture) {
        newImageUrls[index] = URL.createObjectURL(row.profilePicture);
      }
    });
    setImageUrls(newImageUrls);

    return () => {
      Object.values(newImageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.name || "N/A"}</TableCell>
                <TableCell>{row?.email || "N/A"}</TableCell>
                <TableCell>{row?.phone || "N/A"}</TableCell>
                <TableCell>{row?.dob || "N/A"}</TableCell>
                <TableCell>
                  {row
                    ? `${row.city || "N/A"}, ${
                        row.district || "N/A"
                      }, Province ${row.province || "N/A"}, ${
                        row.country || "N/A"
                      }`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(index)}>Edit</Button>
                  <Button color="error" onClick={() => onDelete(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TableComponent;
