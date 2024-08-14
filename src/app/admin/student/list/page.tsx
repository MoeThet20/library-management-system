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
} from "@mui/material";
import { Layout } from "@/components/common";
import { Colors } from "@/const/colors";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { STUDENT_CREATE, STUDENT_UPDATE } from "@/const/routes";

const data = [
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
  const router = useRouter();

  const handleCreateStudent = () => {
    router.push(STUDENT_CREATE);
  };
  const handleDelete = () => {};

  const handleEditClick = () => {
    router.push(STUDENT_UPDATE);
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
          <Button
            variant="contained"
            sx={{ backgroundColor: Colors.primary_color }}
            onClick={handleCreateStudent}
          >
            Create
          </Button>
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
              {data.map((row, index) => (
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
      </Container>
    </Layout>
  );
}
