"use client";
import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { Layout } from "@/components/common";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RETURN_LIST } from "@/const/routes";
import { YEARS } from "@/const";
import { getStudentWithQuery } from "@/services/student.service";
import { RETURN_BOOK_TYPE } from "@/initialValues/borrow";
import { getAllBorrowBook } from "@/services/borrow.service";
import { useAppDispatch } from "@/hook/ReduxHooks";
import { enableErrorMessageModal } from "@/redux/features/messageModalSlice";
import { returnBookCreate } from "@/services/return.service";

type ListType = {
  id: string;
  title: string;
  studentName: string;
  teacherName: string;
  studentId: string;
  bookId: string;
  createdDate: string;
};

type StudentType = {
  id: string;
  name: string;
  roleNumber: string;
  phoneNumber: string;
  currentYear: string;
  initialYear: string;
  createdBy: string;
  createdDate: string;
};

type StudentListType = {
  value: string;
  label: string;
};

type StudentDataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<StudentType>;
};

type borrowedDataType = {
  total: number;
  list: Array<ListType>;
};

const ZERO = 0;
const EMPTY = "";

export default function ReturnCreate() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedBorrowBook, setSelectedBorrowBook] = useState<
    Array<ListType> | []
  >([]);
  const [studentList, setStudentList] = useState<Array<StudentListType> | []>(
    []
  );
  const [borrowedBookList, setBorrowedBookList] = useState<Array<ListType>>([]);
  const [studentAllDataList, setStudentAllDataList] =
    useState<StudentDataType | null>(null);
  const [borrowedList, setBorrowedList] = useState<borrowedDataType | null>(
    null
  );

  const [year, setYear] = useState("First");
  const [student, setStudent] = useState("");

  useEffect(() => {
    if (!studentAllDataList) {
      getStudentList();
      return;
    }
    const desireData = studentAllDataList.list
      .filter((student) => student.currentYear === year)
      .map((student) => ({
        value: student.id,
        label: student.name,
      }));

    setStudentList(desireData);
  }, [year]);

  const getStudentList = async () => {
    const res: StudentDataType = await getStudentWithQuery(
      null,
      null,
      null,
      true
    );
    setStudentAllDataList(res);
  };

  useEffect(() => {
    if (!borrowedList) {
      getBorrowedList();
      return;
    }
    const desireBorrowedData = borrowedList.list.filter(
      (book) => book.studentId === student
    );
    setBorrowedBookList(desireBorrowedData);
  }, [student]);

  const getBorrowedList = async () => {
    const res: borrowedDataType = await getAllBorrowBook();
    setBorrowedList(res);
  };

  const handleYearsChange = (event: any) => {
    setYear(event.target.value);
  };
  const handleStudentsChange = (event: any) => {
    if (studentList.length === ZERO) return;
    setStudent(event.target.value);
  };

  const handleSelectBook = (value: ListType) => {
    setSelectedBorrowBook((prev) => [...prev, value]);
  };

  const handleRemoveBook = (id: string) => {
    setSelectedBorrowBook((prev) => prev.filter((book) => book.id !== id));
  };

  const handleSubmit = async () => {
    const unSelectedStudent = student === EMPTY;
    const noSelectedBook = selectedBorrowBook.length === ZERO;
    if (unSelectedStudent) {
      dispatch(enableErrorMessageModal("Please select student."));
    }
    if (!sessionData?.user?.id || noSelectedBook || unSelectedStudent) return;

    const request: RETURN_BOOK_TYPE = {
      books: selectedBorrowBook.map((borrow) => borrow.bookId),
      borrowedIds: selectedBorrowBook.map((borrow) => borrow.id),
      studentId: student,
      teacherId: sessionData?.user?.id,
    };

    const res = await returnBookCreate(request);
    if (!res) return;

    router.push(RETURN_LIST);
  };

  return (
    <Layout>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Return Book
        </Typography>
      </Box>
      <div className="my-5">
        <div className="mb-3">
          <TextField
            select
            label="Years"
            value={year}
            onChange={handleYearsChange}
            variant="outlined"
            sx={{ width: "20%", marginRight: "20px" }}
          >
            {YEARS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Students"
            value={student}
            onChange={handleStudentsChange}
            variant="outlined"
            sx={{ width: "50%" }}
          >
            {studentList.length === ZERO ? (
              <MenuItem>There is no {year.toLowerCase()} year student</MenuItem>
            ) : (
              studentList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </TextField>
        </div>

        <div className="mb-5">
          {borrowedBookList && (
            <TableContainer
              sx={{
                maxHeight: 280,
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Borrowed By</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrowedBookList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        There is no borrowed book for this student.
                      </TableCell>
                    </TableRow>
                  ) : (
                    borrowedBookList.map((book, index) => (
                      <TableRow key={book.id}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.teacherName}</TableCell>
                        <TableCell align="right">
                          {selectedBorrowBook.some(
                            (selectedBorrowBook) =>
                              selectedBorrowBook.id === book.id
                          ) ? (
                            <Typography variant="body2">
                              Already Selected
                            </Typography>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => handleSelectBook(book)}
                            >
                              Return
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>

        <Typography>Selected Return Books</Typography>
        <TableContainer
          sx={{
            maxHeight: 280,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Borrowed By</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedBorrowBook.length === ZERO ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    There is no selected return book
                  </TableCell>
                </TableRow>
              ) : (
                selectedBorrowBook.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.teacherName}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleRemoveBook(data.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedBorrowBook.length > ZERO && (
          <div className="flex justify-center my-5" onClick={handleSubmit}>
            <Button variant="contained">Return Books</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
