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
} from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
interface Column {
  id:
    | "name"
    | "phone_number"
    | "rfid"
    | "occupation"
    | "created_date"
    | "updated_date";
  label: string;
  minWidth?: number;
  align?: "center" | "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone_number", label: "Phone Number", minWidth: 100, align: "center" },
  {
    id: "rfid",
    label: "RFID",
    minWidth: 170,
    align: "center",
  },
  {
    id: "occupation",
    label: "Occupation",
    minWidth: 170,
    align: "center",
  },
  {
    id: "created_date",
    label: "Created Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "updated_date",
    label: "Updated Date",
    minWidth: 170,
    align: "right",
  },
];
interface Data {
  name: string;
  phone_number: string;
  rfid: string;
  occupation: string;
  created_date: string;
  updated_date: string;
}

function createData(
  name: string,
  phone_number: string,
  rfid: string,
  occupation: string,
  created_date: string,
  updated_date: string
): Data {
  return { name, phone_number, rfid, occupation, created_date, updated_date };
}
const rows = [
  createData(
    "Daw Aye Aye",
    "09794412389",
    "LB1234",
    "Professor",
    "31/7/2024",
    "31/7/2024"
  ),
];

export default function TeacherList() {
  useRedirectIfAuthenticated();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography align="center" mt={2} component="h1" variant="h5">
        Teacher List
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
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
    </Container>
  );
}
