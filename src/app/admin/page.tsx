"use client";

import React, { useEffect, useState } from "react";
import { Layout, Loading } from "@/components/common";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getDashboardData } from "@/services/dashboard.service";
import {
  BOOK_LIST,
  BORROW_CREATE,
  BORROW_LIST,
  CATEGORY_LIST,
  RETURN_CREATE,
  STUDENT_LIST,
  TEACHER_LIST,
} from "@/const/routes";
import { convertDateString, DAY_MONTH_YEAR_HOUR_MINUTE } from "@/const";
import { getWarningWithQuery } from "@/services/warning.service";

type InfoType = {
  totalTeacher: number;
  totalStudent: number;
  totalBook: number;
  totalBorrow: number;
  totalCategory: number;
};

type ListType = {
  id: string;
  title: string;
  studentName: string;
  teacherName: string;
  studentId: string;
  bookId: string;
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

function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<InfoType | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    getDashboardInfo();
  }, []);

  const getDashboardInfo = async () => {
    const res = await getDashboardData();
    setDashboardInfo(res);
  };

  useEffect(() => {
    setData(null);
    getWarningBookData();
  }, [page, rowsPerPage]);

  const getWarningBookData = async () => {
    const res = await getWarningWithQuery(page + 1, rowsPerPage);
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

  const changeChartColor = (color: string) => ({
    [`& .${gaugeClasses.valueArc}`]: {
      fill: color,
    },
  });

  return (
    <Layout>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 3 }}
        justifyContent="center"
      >
        <div className="flex flex-col items-center">
          <Typography variant="h4">Teachers</Typography>
          <Link href={TEACHER_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalTeacher || ZERO}
              sx={() => changeChartColor("#6255a9")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Students</Typography>
          <Link href={STUDENT_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalStudent || ZERO}
              sx={() => changeChartColor("#3444a9")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Books</Typography>
          <Link href={BOOK_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalBook || ZERO}
              sx={() => changeChartColor("#3a9288")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Category</Typography>
          <Link href={CATEGORY_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalCategory || ZERO}
              sx={() => changeChartColor("#3186a2")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Borrows</Typography>
          <Link href={BORROW_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalBorrow || ZERO}
              sx={() => changeChartColor("#2a77a5")}
            />
          </Link>
        </div>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 3 }}
        justifyContent="center"
        sx={{ marginTop: 5 }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, maxWidth: "30%", marginLeft: 10 }}
          href={BORROW_CREATE}
        >
          Borrow Books
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, maxWidth: "30%", marginLeft: 10 }}
          href={RETURN_CREATE}
        >
          Return Books
        </Button>
      </Stack>
      <hr className="my-5" />
      <div className="text-yellow-500 ">
        <Typography variant="h5">Warning List !!</Typography>
      </div>
      <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Borrow Student</TableCell>
              <TableCell>Borrow By</TableCell>
              <TableCell align="right">Borrowed Date</TableCell>
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
                  There is no warning book.
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
    </Layout>
  );
}

export default Dashboard;
