"use client";
import * as React from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Form } from "formik";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Colors } from "@/const/colors";
import { Select, TextInput, Layout } from "@/components/common";
import { useRouter } from "next/navigation";

// interface Column {
//   id:
//     | "name"
//     | "phone_number"
//     | "rfid"
//     | "occupation"
//     | "created_date"
//     | "updated_date";
//   label: string;
//   minWidth?: number;
//   align?: "center" | "right";
//   format?: (value: number) => string;
// }
// const columns: readonly Column[] = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "phone_number", label: "Phone Number", minWidth: 100, align: "center" },
//   {
//     id: "rfid",
//     label: "RFID",
//     minWidth: 170,
//     align: "center",
//   },
//   {
//     id: "occupation",
//     label: "Occupation",
//     minWidth: 170,
//     align: "center",
//   },
//   {
//     id: "created_date",
//     label: "Created Date",
//     minWidth: 170,
//     align: "center",
//   },
//   {
//     id: "updated_date",
//     label: "Updated Date",
//     minWidth: 170,
//     align: "right",
//   },
// ];
// interface Data {
//   name: string;
//   phone_number: string;
//   rfid: string;
//   occupation: string;
//   created_date: string;
//   updated_date: string;
// }

// function createData(
//   name: string,
//   phone_number: string,
//   rfid: string,
//   occupation: string,
//   created_date: string,
//   updated_date: string
// ): Data {
//   return { name, phone_number, rfid, occupation, created_date, updated_date };
// }
// const rows = [
//   createData(
//     "Daw Aye Aye",
//     "09794412389",
//     "LB1234",
//     "Professor",
//     "31/7/2024",
//     "31/7/2024"
//   ),
// ];


export default function TeacherList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "phone_no", headerName: "Phone No.", width: 130 },
    { field: "rfid", headerName: "RFID", width: 130 },
    { field: "occupation", headerName: "Occupation", width: 130 },
    { field: "created_date", headerName: "Created Date", width: 120 },
    {
      field: 'edit',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: '100%' }}>
        <IconButton
          sx={{color: Colors.primary_color}}
          aria-label="edit"
          onClick={() => handleEditClick(params.row.id)}
        >
          <EditIcon />
        </IconButton>
        </div>
      ),
    },
  ];
  
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
  
  const handleEditClick = (id: number) => {
    // alert(`Edit row with ID: ${id}`);
    router.push('/admin/teacher/update');
  };

  const handleCreateTeacher =() =>{
    router.push('/admin/teacher/create');
  }
  
  return (
    <Layout>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography component="h1" variant="h5">
            Teacher List
          </Typography>
          <Button 
          variant="contained"
           sx={{backgroundColor: Colors.primary_color}}
           onClick={handleCreateTeacher}>Create</Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
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
        </TableContainer> */}
      </Container>
    </Layout>
  );
}
