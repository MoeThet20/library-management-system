"use client";
import React, { useEffect, useCallback, useState } from "react";
import {
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
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { Layout, SearchInput } from "@/components/common";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BORROW_LIST } from "@/const/routes";
import { debounce, ONE_SECOND } from "@/utils/helper";
import { getBookWithQuery } from "@/services/book.service";
import { YEARS } from "@/const";
import { getStudentWithQuery } from "@/services/student.service";
import { BORROW_BOOK_TYPE } from "@/initialValues/borrow";
import { borrowBookCreate } from "@/services/borrow.service";
import { useAppDispatch } from "@/hook/ReduxHooks";
import { enableErrorMessageModal } from "@/redux/features/messageModalSlice";

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
  isBorrowAble: boolean;
  createdBy: string;
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

type DataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<ListType>;
};

type StudentDataType = {
  total: number;
  page: number;
  pageSize: number;
  list: Array<StudentType>;
};

const ZERO = 0;
const EMPTY = "";

export default function BorrowCreate() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<DataType | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBook, setSelectedBook] = useState<Array<ListType> | []>([]);
  const [studentList, setStudentList] = useState<Array<StudentListType> | []>(
    []
  );
  const [studentAllDataList, setStudentAllDataList] =
    useState<StudentDataType | null>(null);

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

  const handleYearsChange = (event: any) => {
    setYear(event.target.value);
  };
  const handleStudentsChange = (event: any) => {
    if (studentList.length === ZERO) return;
    setStudent(event.target.value);
  };

  const handleSelectBook = (value: ListType) => {
    setSelectedBook((prev) => [...prev, value]);
  };

  const handleRemoveBook = (id: string) => {
    setSelectedBook((prev) => prev.filter((book) => book.id !== id));
  };

  const fetchResults = useCallback(
    debounce(async (query: any) => {
      try {
        setData(null);
        if (query === "") return;
        const res = await getBookWithQuery(null, null, query, true);
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

  const handleSubmit = async () => {
    const unSelectedStudent = student === EMPTY;
    const noSelectedBook = selectedBook.length === ZERO;
    if (unSelectedStudent) {
      dispatch(enableErrorMessageModal("Please select student."));
    }
    if (!sessionData?.user?.id || noSelectedBook || unSelectedStudent) return;

    const request: BORROW_BOOK_TYPE = {
      books: selectedBook.map((book) => book.id),
      studentId: student,
      teacherId: sessionData?.user?.id,
    };

    const res = await borrowBookCreate(request);
    if (!res) return;

    router.push(BORROW_LIST);
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
          Borrow Book
        </Typography>
        <div className="mt-5">
          <SearchInput
            label="Books"
            value={searchValue}
            isSearchIcon={false}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>
      </Box>
      {data && (
        <TableContainer
          sx={{
            maxHeight: 280,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell sx={{ width: "10%" }}>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.list.length === 0 ? (
                <></>
              ) : (
                data?.list.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.isbn}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.author}</TableCell>
                    <TableCell align="right">
                      {selectedBook.some((book) => book.id === data.id) ? (
                        <Typography variant="body2">
                          Already Selected
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          disabled={!data.isBorrowAble}
                          onClick={() => handleSelectBook(data)}
                        >
                          {!data.isBorrowAble ? "Borrowed" : "Borrow"}
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
              <MenuItem>There is no {year.toLowerCase()} student</MenuItem>
            ) : (
              studentList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </TextField>
        </div>

        <Typography>Selected Books</Typography>
        <TableContainer
          sx={{
            maxHeight: 280,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell sx={{ width: "10%" }}>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedBook.length === ZERO ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Book is not selected
                  </TableCell>
                </TableRow>
              ) : (
                selectedBook.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{data.isbn}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.author}</TableCell>
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
        {selectedBook.length > ZERO && (
          <div className="flex justify-center my-5" onClick={handleSubmit}>
            <Button variant="contained">Borrow Books</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
