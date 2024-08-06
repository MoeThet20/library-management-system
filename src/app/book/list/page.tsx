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
  id:1,
  title: 'Networking',
  author: 'Khine Zaw Htet',
  isbn: 'isbn',
  category: 'IT',
  publication_date:  '21/6/2000',
  amount: '20000MMK',
  place: 'First stand',
  created_by: 'Thet Hnin'
 }
];

export default function BookList() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography align="center" mt={2} mb={2} component="h1" variant="h5">
        Book List
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
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">Categories</TableCell>
              <TableCell align="right">Publication Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Place</TableCell>
              <TableCell align="right">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                />
              </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell align="right">{row.isbn}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.publication_date}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.place}</TableCell>
                <TableCell align="right">{row.created_by}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
