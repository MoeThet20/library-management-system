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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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
import {
  getBookWithQueryMoreFilter,
  bookDelete,
} from "@/services/book.service";
import { getCategories } from "@/services/category.service";

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

type categoryType = {
  value: string;
  label: string;
};

type categoryListType = {
  id: string;
  category: string;
  createdBy: string;
  createdDate: string;
};

const ZERO = 0;
const ALL = "all";

export default function BookList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = useState<DataType | null>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<ListType | null>(null);
  const [category, setCategory] = useState(ALL);
  const [categories, setCategories] = useState<Array<categoryType>>([]);

  useEffect(() => {
    setData(null);
    getBookData();
  }, [page, rowsPerPage, category]);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const categoriesRes: Array<categoryListType> = await getCategories();

    const categories =
      categoriesRes.length === ZERO
        ? []
        : categoriesRes.map((category) => ({
            value: category.id,
            label: capitalize(category.category),
          }));
    setCategories(categories);
  };

  const getBookData = async () => {
    const res = await getBookWithQueryMoreFilter(
      page + 1,
      rowsPerPage,
      searchValue,
      category
    );
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
        const res = await getBookWithQueryMoreFilter(
          page + 1,
          rowsPerPage,
          query,
          category
        );
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

  const handleCategoryChange = (category: string) => setCategory(category);

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
        <div className="flex items-center">
          <SearchInput
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          <div className="ms-3 w-52">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                label="Categories"
              >
                <MenuItem value="all">All</MenuItem>
                {categories.length > 0 &&
                  categories.map((category: categoryType, index: number) => (
                    <MenuItem key={index} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
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
