"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { DatePicker, Layout, Loading } from "@/components/common";
import { Colors } from "@/const/colors";
import { useRouter } from "next/navigation";
import { RETURN_CREATE } from "@/const/routes";
import { convertDateString, DAY_MONTH_YEAR_HOUR_MINUTE } from "@/const";
import { getReturnBookWithQuery } from "@/services/return.service";
import { Field, Form, Formik } from "formik";
import { BORROW_BOOK_SEARCH_INITIAL_VALUE } from "@/initialValues/borrow";
import validation from "@/validation/borrow.service";

type ListType = {
  id: string;
  title: string;
  studentName: string;
  teacherName: string;
  createdDate: string;
};

type DataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<ListType>;
};

const ZERO = 0;
const ONE = 1;

export default function ReturnList() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    setData(null);
    getBorrowData();
  }, [page, rowsPerPage]);

  const getBorrowData = async () => {
    const res = await getReturnBookWithQuery(page + 1, rowsPerPage);
    setData(res);
  };

  const goToCreateBorrow = () => router.push(RETURN_CREATE);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (values: { startDate: Date; endDate: Date }) => {
    setData(null);

    const res = await getReturnBookWithQuery(
      1,
      rowsPerPage,
      values.startDate,
      values.endDate
    );

    setData(res);
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
            Return List
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
        <Formik
          initialValues={BORROW_BOOK_SEARCH_INITIAL_VALUE}
          validationSchema={validation.borrowReturnSearchValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-center">
                <div className="my-3 mr-3">
                  <Typography variant="body2">Start Date</Typography>
                  <Field name="startDate" component={DatePicker} />
                </div>
                <div className="my-3 ml-3">
                  <Typography variant="body2">End Date</Typography>
                  <Field name="endDate" component={DatePicker} />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, maxWidth: "20%", marginLeft: 10 }}
                >
                  Search
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Book Title</TableCell>
                <TableCell>Return Student</TableCell>
                <TableCell>Received By</TableCell>
                <TableCell align="right">Return Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!data ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : data?.list.length === ZERO ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    There is no return book.
                  </TableCell>
                </TableRow>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + ONE}
                    </TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.studentName}</TableCell>
                    <TableCell>{data.teacherName}</TableCell>
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
