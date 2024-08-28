/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, capitalize } from "@mui/material";
import * as React from "react";
import { debounce, ONE_SECOND } from "@/utils/helper";
import { getBookWithQuery } from "@/services/book.service";
import { LoadingModal } from "@/components/common";
import { LearnMoreModal } from "@/components";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/const/routes";

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

const PAGE = 1;
const PAGE_SIZE = 1000;
const ONE = 1;

export default function BookSearchList() {
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState("");
  const [books, setBooks] = React.useState<DataType | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<ListType | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const res = await getBookWithQuery(PAGE, PAGE_SIZE);
    setBooks(res);
  };

  const fetchResults = React.useCallback(
    debounce(async (query: any) => {
      try {
        setBooks(null);
        const res = await getBookWithQuery(PAGE, PAGE_SIZE, query);
        setBooks(res);
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

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  const handleLearnMore = (book: ListType) => {
    setSelectedBook(book);
    toggleModal();
  };

  const goToLogin = () => router.push(LOGIN);

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <img
        src="/background_library.jpg"
        className="absolute z-0 w-full h-screen"
        alt=""
      />
      <div className="z-20 flex flex-col items-center mt-5">
        <h1 className="m-5 text-4xl text-white">Library Management System</h1>
        <div className="relative w-full px-4">
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-7">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search......."
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>
        <div className="absolute right-6">
          <Button variant="contained" onClick={goToLogin}>
            Go To Login
          </Button>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center p-5 mt-5 overflow-auto no-scrollbar">
        <div className="flex-col w-full border-green-50">
          {books &&
            books?.list.length > 0 &&
            books?.list?.map((book, index) => (
              <div
                className="flex-col p-5 my-5 text-black bg-white rounded-xl w-50vw"
                key={index}
              >
                <h2 className="font-bold text-primary">{book.title}</h2>
                <p className="mt-1">
                  Author:{" "}
                  <span className="font-bold">{book.author || "-"}</span>
                </p>
                <p className="mt-1">
                  Category:{" "}
                  {book.categories.map(
                    (category, index) =>
                      `${capitalize(category)}${
                        book.categories.length > ONE &&
                        book.categories.length !== index + 1
                          ? ","
                          : ""
                      }`
                  )}
                </p>
                <div className="flex justify-end w-full">
                  <button
                    className="px-5 py-2 mt-3 text-white rounded-md bg-primary"
                    onClick={() => handleLearnMore(book)}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <LearnMoreModal
        isOpen={isOpenModal}
        handleClose={toggleModal}
        selectedBook={selectedBook}
      />
      <LoadingModal />
    </div>
  );
}
