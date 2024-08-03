import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";

const ProfilePage = ({ data }) => {
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.profilePicture ? (
                    <img
                      src={URL.createObjectURL(row.profilePicture)}
                      alt="Profile"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </TableCell>

                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{`${row.city}, ${row.district}, Province ${row.province}, ${row.country}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProfilePage;
