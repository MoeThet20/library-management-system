"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  TablePagination,
  capitalize,
} from "@mui/material";
import { Layout, Loading, SearchInput } from "@/components/common";
import { Colors } from "@/const/colors";
import { useRouter } from "next/navigation";
import { BORROW_CREATE } from "@/const/routes";
import { debounce, ONE_SECOND } from "@/utils/helper";
import { convertDateString, DAY_MONTH_YEAR_HOUR_MINUTE } from "@/const";
import { getBookWithQuery } from "@/services/book.service";

type ListType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categories: Array<string>;
  description: string;
  publicationDate: Date;
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

const ONE = 1;

export default function BorrowList() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    setData(null);
    getBorrowData();
  }, [page, rowsPerPage]);

  const getBorrowData = async () => {
    const res = await getBookWithQuery(page + 1, rowsPerPage, searchValue);
    setData(res);
  };

  const goToCreateBorrow = () => router.push(BORROW_CREATE);

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
            Borrow List
          </Typography>
          <Box display="flex">
            <Button
              variant="contained"
              sx={{ backgroundColor: Colors.primary_color, marginLeft: 4 }}
              onClick={goToCreateBorrow}
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
                <TableCell align="right">Created By</TableCell>
                <TableCell align="right">Created Date</TableCell>
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
                    There is no borrow book.
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
                    <TableCell align="right">{data.createdBy}</TableCell>
                    <TableCell align="right">
                      {convertDateString(
                        data.createdDate,
                        DAY_MONTH_YEAR_HOUR_MINUTE
                      )}
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
