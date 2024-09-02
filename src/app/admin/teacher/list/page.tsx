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
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "@/const/colors";
import {
  ConfirmModal,
  Layout,
  Loading,
  SearchInput,
} from "@/components/common";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import { TEACHER_CREATE, TEACHER_UPDATE } from "@/const/routes";
import { getTeacherWithQuery, teacherDelete } from "@/services/teacher.service";
import {
  CONFIRM_MESSAGE,
  convertDateString,
  DAY_MONTH_YEAR_HOUR_MINUTE,
} from "@/const";
import { debounce, ONE_SECOND } from "@/utils/helper";
import { useAppDispatch } from "@/hook/ReduxHooks";
import { updatedSelectedTeacher } from "@/redux/features/teacherSlice";

type ListType = {
  id: string;
  email: string;
  name: string;
  occupation: string;
  rfid: string;
  createdDate: string;
  phoneNumber: string;
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

export default function TeacherList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<DataType | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ListType | null>(null);

  useEffect(() => {
    setData(null);
    getTeacherData();
  }, [page, rowsPerPage]);

  const getTeacherData = async () => {
    const res = await getTeacherWithQuery(page + 1, rowsPerPage, searchValue);
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

  const goToCreateTeacher = () => {
    router.push(TEACHER_CREATE);
  };

  const handleDelete = async () => {
    if (!selectedTeacher) return;
    toggleConfirmModal();

    const res = await teacherDelete(selectedTeacher?.id);
    if (!res) return;

    setData((prev: any) => {
      return {
        ...prev,
        list: prev?.list.filter(
          (teacher: ListType) => teacher.id !== selectedTeacher?.id
        ),
      };
    });
  };

  const handleTeacherById = (action: ACTION, data: ListType) => {
    setSelectedTeacher(data);
    if (action === DELETE) {
      toggleConfirmModal();
      return;
    }
    dispatch(updatedSelectedTeacher(data));
    router.push(TEACHER_UPDATE);
  };

  const fetchResults = useCallback(
    debounce(async (query: any) => {
      try {
        setData(null);
        const res = await getTeacherWithQuery(page + 1, rowsPerPage, query);
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
            <Button
              variant="contained"
              sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
              onClick={goToCreateTeacher}
              size="small"
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
                <TableCell>Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">RFID</TableCell>
                <TableCell align="right">Occupation</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell></TableCell>
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
                    There is no teacher.
                  </TableCell>
                </TableRow>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
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
                        onClick={() => handleTeacherById(EDIT, data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: Colors.primary_color }}
                        aria-label="delete"
                        onClick={() => handleTeacherById(DELETE, data)}
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
