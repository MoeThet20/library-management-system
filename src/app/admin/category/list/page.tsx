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
  capitalize,
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
import { CATEGORY_CREATE, CATEGORY_UPDATE } from "@/const/routes";
import { debounce, ONE_SECOND } from "@/utils/helper";
import {
  getCategoryWithQuery,
  categoryDelete,
} from "@/services/category.service";
import {
  CONFIRM_MESSAGE,
  convertDateString,
  DAY_MONTH_YEAR_HOUR_MINUTE,
} from "@/const";
import { updatedSelectedCategory } from "@/redux/features/categorySlice";
import { useAppDispatch } from "@/hook/ReduxHooks";

type ListType = {
  id: string;
  category: string;
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

export default function CategoryList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = useState<DataType | null>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ListType | null>(
    null
  );

  useEffect(() => {
    setData(null);
    getCategoryData();
  }, [page, rowsPerPage]);

  const getCategoryData = async () => {
    const res = await getCategoryWithQuery(page + 1, rowsPerPage, searchValue);
    setData(res);
  };

  const goToCreateStudent = () => router.push(CATEGORY_CREATE);

  const handleDelete = async () => {
    if (!selectedCategory) return;
    toggleConfirmModal();

    const res = await categoryDelete(selectedCategory?.id);
    if (!res) return;
    setData((prev: any) => {
      return {
        ...prev,
        list: prev?.list.filter(
          (student: ListType) => student.id !== selectedCategory?.id
        ),
      };
    });
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
        const res = await getCategoryWithQuery(page + 1, rowsPerPage, query);
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

  const handleCategoryById = (action: ACTION, data: ListType) => {
    setSelectedCategory(data);
    if (action === DELETE) {
      toggleConfirmModal();
      return;
    }
    dispatch(updatedSelectedCategory(data));
    router.push(CATEGORY_UPDATE);
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
            Category List
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
                <TableCell>Category</TableCell>
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {!data ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : data?.list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    There is no category.
                  </TableCell>
                </TableRow>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{capitalize(data.category)}</TableCell>
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
                        onClick={() => handleCategoryById(EDIT, data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: Colors.primary_color }}
                        aria-label="delete"
                        onClick={() => handleCategoryById(DELETE, data)}
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
