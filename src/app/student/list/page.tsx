import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  CssBaseline,
  Typography,
  Checkbox,
} from "@mui/material";

const data = [
  {
    id: 1,
    name: "Khine Zaw Htet",
    role_no: "6EC-1",
    current_year: 'Final Year',
    created_date: '1/8/2024',
    updated_date: '1/8/2024',
    created_by: "Daw Aye Aye",
  },
  {
    id: 2,
    name: "Ko Khine Gyi",
    role_no: "6EC-2",
    current_year: 'Final Year',
    created_date: '1/8/2024',
    updated_date: '1/8/2024',
    created_by: "Daw Aye Aye",
  },
  {
    id: 3,
    name: "Moe Thet",
    role_no: "6EC-3",
    current_year: 'Final Year',
    created_date: '1/8/2024',
    updated_date: '1/8/2024',
    created_by: "Daw Aye Aye",
  },
];

export default function StudentList() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography align="center" mt={2} mb={2} component="h1" variant="h5">
        Student List
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  // inputProps={{
                  //   "aria-label": "select all desserts",
                  // }}
                />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role Number</TableCell>
              <TableCell align="right">Current Year</TableCell>
              <TableCell align="right">Created date</TableCell>
              <TableCell align="right">Updated date</TableCell>
              <TableCell align="right">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role_no}</TableCell>
                <TableCell align="right">{row.current_year}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
                <TableCell align="right">{row.updated_date}</TableCell>
                <TableCell align="right">{row.created_by}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
