"use client";
import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "@/const/colors";
import { Layout, SearchInput } from "@/components/common";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import { TEACHER_CREATE, TEACHER_UPDATE } from "@/const/routes";
import { getTeacherWithQuery } from "@/services/teacher.service";
import { convertDateString, DAY_MONTH_YEAR_HOUR_MINUTE } from "@/const";

type DataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<{
    id: string;
    email: string;
    name: string;
    occupation: string;
    rfid: string;
    createdDate: string;
    phoneNumber: string;
  }>;
};

export default function TeacherList() {

  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectionModel, setSelectionModel] = useState([]);
  const [data, setData] = useState<DataType | null>(null);
  const [searchValue, setSearchValue] = React.useState('')

  useEffect(() => {
    setData(null);
    getTeacherData();
  }, [page, rowsPerPage]);

  const getTeacherData = async () => {
    const res = await getTeacherWithQuery(page + 1, rowsPerPage);
    setData(res);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(data);

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
          <Box display="flex">
            <SearchInput value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}  />
            <Button
              variant="contained"
              sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
              onClick={handleCreateTeacher}
              size="small"
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
                <TableCell>Email</TableCell>
                <TableCell align="right">Phone No.</TableCell>
                <TableCell align="right">RFID</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.list.length === 0 ? (
                <>No Data</>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell align="right">{data.phoneNumber}</TableCell>
                    <TableCell align="right">{data.rfid}</TableCell>
                    <TableCell align="right">{data.occupation}</TableCell>
                    <TableCell align="right">
                      {convertDateString(
                        data.createdDate,
                        DAY_MONTH_YEAR_HOUR_MINUTE
                      )}
                    </TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data?.total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Layout>
  );
}
