"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import {
  ConfirmModal,
  Layout,
  Loading,
  SearchInput,
} from "@/components/common";
import { Colors } from "@/const/colors";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { STUDENT_CREATE, STUDENT_UPDATE } from "@/const/routes";
import { debounce, ONE_SECOND } from "@/utils/helper";
import { getStudentWithQuery, studentDelete } from "@/services/student.service";
import {
  CONFIRM_MESSAGE,
  convertDateString,
  DAY_MONTH_YEAR_HOUR_MINUTE,
} from "@/const";
import { updatedSelectedStudent } from "@/redux/features/studentSlice";
import { useAppDispatch } from "@/hook/ReduxHooks";

type ListType = {
  id: string;
  name: string;
  roleNumber: string;
  phoneNumber: string;
  currentYear: string;
  initialYear: string;
  createdBy: string;
  createdDate: string;
};

type DataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<ListType>;
};

const DELETE = "DELETE";
const EDIT = "EDIT";

type ACTION = "DELETE" | "EDIT";

export default function StudentList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = useState<DataType | null>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<ListType | null>(null);

  useEffect(() => {
    setData(null);
    getStudentData();
  }, [page, rowsPerPage]);

  const getStudentData = async () => {
    const res = await getStudentWithQuery(page + 1, rowsPerPage, searchValue);
    setData(res);
  };

  const goToCreateStudent = () => router.push(STUDENT_CREATE);

  const handleDelete = async () => {
    setData((prev: any) => {
      return {
        ...prev,
        list: prev?.list.filter(
          (student: ListType) => student.id !== selectedStudent?.id
        ),
      };
    });
    toggleConfirmModal();
    selectedStudent && (await studentDelete(selectedStudent?.id));
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

  const fetchResults = useCallback(
    debounce(async (query: any) => {
      try {
        setData(null);
        const res = await getStudentWithQuery(page + 1, rowsPerPage, query);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, ONE_SECOND),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    fetchResults(value);
  };

  const toggleConfirmModal = () => setIsOpenConfirmModal((prev) => !prev);

  const handleStudentById = (action: ACTION, data: ListType) => {
    setSelectedStudent(data);
    if (action === DELETE) {
      toggleConfirmModal();
      return;
    }
    dispatch(updatedSelectedStudent(data));
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
          <Box display="flex">
            <Button
              variant="contained"
              sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
              onClick={goToCreateStudent}
            >
              Create
            </Button>
          </Box>
        </Box>
        <SearchInput
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role Number</TableCell>
                <TableCell align="right">Current Year</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {!data ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : data?.list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    There is no student.
                  </TableCell>
                </TableRow>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.roleNumber}</TableCell>
                    <TableCell align="right">{data.currentYear}</TableCell>
                    <TableCell align="right">{data.phoneNumber}</TableCell>
                    <TableCell align="right">{data.createdBy}</TableCell>
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
                        onClick={() => handleStudentById(EDIT, data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: Colors.primary_color }}
                        aria-label="delete"
                        onClick={() => handleStudentById(DELETE, data)}
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
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        message={CONFIRM_MESSAGE.DELETE}
        handleNo={toggleConfirmModal}
        handleYes={handleDelete}
      />
    </Layout>
  );
}
