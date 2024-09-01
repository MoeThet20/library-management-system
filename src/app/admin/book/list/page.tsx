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
import { BOOK_CREATE, BOOK_UPDATE } from "@/const/routes";
import { debounce, ONE_SECOND, yearRoleNumberConverter } from "@/utils/helper";
import {
  CONFIRM_MESSAGE,
  convertDateString,
  DAY_MONTH_YEAR_HOUR_MINUTE,
} from "@/const";
import { updatedSelectedBook } from "@/redux/features/bookSlice";
import { useAppDispatch } from "@/hook/ReduxHooks";
import { getBookWithQuery, bookDelete } from "@/services/book.service";

type ListType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categories: Array<string>;
  description: string;
  publicationDate: string;
  amount: number;
  place: string;
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
const ONE = 1;

type ACTION = "DELETE" | "EDIT";

export default function BookList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = useState<DataType | null>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<ListType | null>(null);

  useEffect(() => {
    setData(null);
    getBookData();
  }, [page, rowsPerPage]);

  const getBookData = async () => {
    const res = await getBookWithQuery(page + 1, rowsPerPage, searchValue);
    setData(res);
  };

  const goToCreateBook = () => router.push(BOOK_CREATE);

  const handleDelete = async () => {
    if (!selectedBook) return;
    toggleConfirmModal();

    const res = await bookDelete(selectedBook?.id);
    if (!res) return;

    setData((prev: any) => {
      return {
        ...prev,
        list: prev?.list.filter(
          (book: ListType) => book.id !== selectedBook?.id
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
        const res = await getBookWithQuery(page + 1, rowsPerPage, query);
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

  const handleBookById = (action: ACTION, data: ListType) => {
    setSelectedBook(data);
    if (action === DELETE) {
      toggleConfirmModal();
      return;
    }
    dispatch(updatedSelectedBook(data));
    router.push(BOOK_UPDATE);
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
            <Button
              variant="contained"
              sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
              onClick={goToCreateBook}
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
                <TableCell>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell align="right">Categories</TableCell>
                <TableCell align="right">Publication Date</TableCell>
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
                    There is no book.
                  </TableCell>
                </TableRow>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{data.isbn}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.author}</TableCell>
                    <TableCell align="right">
                      {data.categories.map(
                        (category, index) =>
                          `${capitalize(category)}${
                            data.categories.length > ONE &&
                            data.categories.length !== index + 1
                              ? ","
                              : ""
                          }`
                      )}
                    </TableCell>
                    <TableCell align="right">{data.publicationDate}</TableCell>
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
                        onClick={() => handleBookById(EDIT, data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: Colors.primary_color }}
                        aria-label="delete"
                        onClick={() => handleBookById(DELETE, data)}
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
          rowsPerPageOptions={[10, 25]}
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
