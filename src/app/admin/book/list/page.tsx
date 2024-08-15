"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors } from "@/const/colors";
import { Button, Container, CssBaseline } from "@mui/material";
import { Layout, SearchInput } from "@/components/common";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import { BOOK_CREATE, BOOK_UPDATE } from "@/const/routes";

const rows = [
  {
    id: 1,
    title: "Networking",
    author: "Khine Zaw Htet",
    isbn: "ISBN",
    category: "IT",
    publication_date: "21/6/2000",
    amount: "1",
    place: "First stand",
    created_by: "Thet Hnin",
    created_date: "13/8/2024",
  },
  {
    id: 2,
    title: "Networking",
    author: "Khine Zaw Htet",
    isbn: "ISBN",
    category: "IT",
    publication_date: "21/6/2000",
    amount: "1",
    place: "First stand",
    created_by: "Thet Hnin",
    created_date: "13/8/2024",
  },
];

export default function EnhancedTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState('')
  const router = useRouter();

  const handleCreateBook = () => {
    router.push(BOOK_CREATE);
  };
  const handleDelete = () => {};
  const handleEditClick = () => {
    router.push(BOOK_UPDATE);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography component="h1" variant="h5">
            Book List
          </Typography>
          <Box display="flex">
            <SearchInput value={searchValue} onChange={event=>setSearchValue(event.target.value)}  />
          <Button
            variant="contained"
            sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
            onClick={handleCreateBook}
          >
            Create
          </Button>
          </Box>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell align="right">ISBN</TableCell>
                <TableCell align="right">Categories</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell align="right">{row.isbn}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.created_by}</TableCell>
                  <TableCell align="right">{row.created_date}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{ color: Colors.primary_color }}
                      aria-label="edit"
                      onClick={() => handleEditClick()}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: Colors.primary_color }}
                      aria-label="delete"
                      onClick={() => handleDelete()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Layout>
  );
}

// import React from "react";
// import {
// import { EditIcon } from '@mui/icons-material/Edit';
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Container,
//   CssBaseline,
//   Typography,
//   Checkbox,
// } from "@mui/material";

// const data = [
//  {
//   id:1,
//   title: 'Networking',
//   author: 'Khine Zaw Htet',
//   isbn: 'isbn',
//   category: 'IT',
//   publication_date:  '21/6/2000',
//   amount: '20000MMK',
//   place: 'First stand',
//   created_by: 'Thet Hnin'
//  }
// ];

// export default function BookList() {
//   return (
//     <Container component="main" maxWidth="lg">
//       <CssBaseline />
//       <Typography align="center" mt={2} mb={2} component="h1" variant="h5">
//         Book List
//       </Typography>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   color="primary"
//                   // indeterminate={numSelected > 0 && numSelected < rowCount}
//                   // checked={rowCount > 0 && numSelected === rowCount}
//                   // onChange={onSelectAllClick}
//                   // inputProps={{
//                   //   "aria-label": "select all desserts",
//                   // }}
//                 />
//               </TableCell>
//               <TableCell>Id</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell align="right">ISBN</TableCell>
//               <TableCell align="right">Categories</TableCell>
//               <TableCell align="right">Publication Date</TableCell>
//               <TableCell align="right">Amount</TableCell>
//               <TableCell align="right">Place</TableCell>
//               <TableCell align="right">Created By</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell padding="checkbox">
//                 <Checkbox
//                   color="primary"
//                 />
//               </TableCell>
//                 <TableCell component="th" scope="row">
//                   {row.id}
//                 </TableCell>
//                 <TableCell>{row.title}</TableCell>
//                 <TableCell>{row.author}</TableCell>
//                 <TableCell align="right">{row.isbn}</TableCell>
//                 <TableCell align="right">{row.category}</TableCell>
//                 <TableCell align="right">{row.publication_date}</TableCell>
//                 <TableCell align="right">{row.amount}</TableCell>
//                 <TableCell align="right">{row.place}</TableCell>
//                 <TableCell align="right">{row.created_by}</TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// }
