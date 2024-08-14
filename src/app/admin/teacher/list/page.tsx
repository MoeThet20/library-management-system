"use client";
import * as React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Colors } from "@/const/colors";
import { Layout } from "@/components/common";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import { TEACHER_CREATE, TEACHER_UPDATE } from "@/const/routes";

export default function TeacherList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectionModel, setSelectionModel] = React.useState([]);
  // const [rowws, setRowws] = React.useState(rows);

  const router = useRouter();
  const rows = [
    {
      id: 1,
      name: "Snow",
      email: "snow@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Professor",
      created_date: "11/8/2024",
    },
    {
      id: 2,
      name: "Lannister",
      email: "lannister@gmail.com",
      phone_no: "09984888904",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 3,
      name: "Ferrara",
      email: "ferrara@gmail.com",
      phone_no: "09790112229",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 4,
      name: "Stark",
      email: "stark@gmail.com",
      phone_no: "09978695643",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 5,
      name: "Targaryen",
      email: "targaryen@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 6,
      name: "Melisandre",
      email: "melisandre@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 7,
      name: "Clifford",
      email: "clifford@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 8,
      name: "Frances",
      email: "frances@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
    {
      id: 9,
      name: "Roxie",
      email: "roxie@gmail.com",
      phone_no: "09794412389",
      rfid: "123456789",
      occupation: "Lecturer",
      created_date: "11/8/2024",
    },
  ];

  const handleEditClick = () => {
    router.push(TEACHER_UPDATE);
  };

  const handleCreateTeacher = () => {
    router.push(TEACHER_CREATE);
  };

  const handleDelete = () => {};

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
            Teacher List
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: Colors.primary_color }}
            onClick={handleCreateTeacher}
          >
            Create
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Phone No.</TableCell>
                <TableCell align="right">RFID</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">{row.phone_no}</TableCell>
                  <TableCell align="right">{row.rfid}</TableCell>
                  <TableCell align="right">{row.occupation}</TableCell>
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
      </Container>
      {/* <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        /> */}
      {/* <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container> */}
    </Layout>
  );
}
