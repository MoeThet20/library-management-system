"use client";
import React from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@mui/material";
import { Layout, SearchInput } from "@/components/common";
import { Colors } from "@/const/colors";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { STUDENT_CREATE, STUDENT_UPDATE } from "@/const/routes";

const rows = [
  {
    id: 1,
    name: "Khine Zaw Htet",
    role_no: "6EC-1",
    current_year: "Final Year",
    created_date: "1/8/2024",
    updated_date: "1/8/2024",
    created_by: "Daw Aye Aye",
  },
  {
    id: 2,
    name: "Ko Khine Gyi",
    role_no: "6EC-2",
    current_year: "Final Year",
    created_date: "1/8/2024",
    updated_date: "1/8/2024",
    created_by: "Daw Aye Aye",
  },
  {
    id: 3,
    name: "Moe Thet",
    role_no: "6EC-3",
    current_year: "Final Year",
    created_date: "1/8/2024",
    updated_date: "1/8/2024",
    created_by: "Daw Aye Aye",
  },
];

export default function StudentList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState('')
  const router = useRouter();

  const handleCreateStudent = () => {
    router.push(STUDENT_CREATE);
  };
  const handleDelete = () => {};

  const handleEditClick = () => {
    router.push(STUDENT_UPDATE);
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
            Student List
          </Typography>
          <Box display="flex">
            <SearchInput value={searchValue} onChange={event=>setSearchValue(event.target.value)}  />
          <Button
            variant="contained"
            sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
            onClick={handleCreateStudent}
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
                <TableCell>Name</TableCell>
                <TableCell>Role Number</TableCell>
                <TableCell align="right">Current Year</TableCell>
                <TableCell align="right">Created date</TableCell>
                <TableCell align="right">Updated date</TableCell>
                <TableCell align="right">Created By</TableCell>
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role_no}</TableCell>
                  <TableCell align="right">{row.current_year}</TableCell>
                  <TableCell align="right">{row.created_date}</TableCell>
                  <TableCell align="right">{row.updated_date}</TableCell>
                  <TableCell align="right">{row.created_by}</TableCell>
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
