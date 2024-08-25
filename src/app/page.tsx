"use client";
import { SearchInput } from "@/components/common";
import { Colors } from "@/const/colors";
import { Box, InputAdornment, Modal, TextField } from "@mui/material";
import { changeSectionValueFormat } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const BOOKS = [
  {
    id: 1,
    title:
      "ERROR ANALYSIS FOR CANON IMAGERUNNER 3045 XEROX MACHINE LIBRARY MANAGEMENT SYSTEM",
    author: "MG YE MANN AUNG",
    category: "GRADUATION THESIS",
  },
  {
    id: 1,
    title: "LIBRARY MANAGEMENT SYSTEM",
    author: "MG KHINE ZAW HTET",
    category: "GRADUATION THESIS",
  },
];
type ListType = {
  id: number;
  title: string;
  author: string;
  category: string;
};
export default function BookSearchList() {
  const [searchValue, setSearchValue] = React.useState("");
  const [books, setBooks] = React.useState<ListType[] | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<ListType | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };
  const handleSearch = () => {
    setBooks(BOOKS);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex bg-red-50 justify-center w-full h-screen">
      <img
        src="/background_library.jpg"
        className="w-full h-screen absolute z-0"
        alt=""
      />
      <div
        className="flex-col flex z-10 items-center"
        style={{ height: "200vh" }}
      >
        <h1 className="text-white m-20 text-4xl">Library Management System</h1>

        <p className="mb-4 ease-linear">
          Your perfect book is just a search away...
        </p>
        {/* <div className="flex-row"> */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          onFocus={() => setBooks(null)}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: Colors.primary_color,
                borderWidth: 2, // Default border color
              },
              "&.Mui-focused fieldset": {
                borderColor: Colors.primary_color, // Border color when focused
              },
              color: Colors.primary_color,
              backgroundColor: Colors.white,
              borderRadius: 12,
              opacity: 50,
              width: 500,
            },
          }}
          InputProps={{
            endAdornment: (
              <div onClick={handleSearch}>
                <InputAdornment position="end" className="cursor-pointer">
                  <SearchIcon sx={{ color: Colors.primary_color }} />
                </InputAdornment>
              </div>
            ),
          }}
        />
        {/* <button
            onClick={() => setOpen(true)}
            className="bg-white px-4 rounded-md h-10 ml-2"
          >
            <TuneIcon sx={{ color: Colors.primary_color }} />
          </button>
        </div> */}
        <div className=" flex-col border-green-50">
          {books?.map((book) => (
            <div className="flex-col bg-white p-4 mt-2 max-w-lg rounded-xl text-black">
              <h2 className="text-primary font-bold">{book.title}</h2>
              <p className="mt-1">Author: {book.author}</p>
              <p className="mt-1">Category: {book.category}</p>
              <button
                onClick={() => {
                  setSelectedBook(book);
                  setOpen(true);
                }}
                className="bg-primary mt-2 px-2 py-1 rounded-md text-white"
              >
                Learn more
              </button>
            </div>
          ))}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          className="flex justify-center items-center"
        >
          <Box
            sx={{
              width: "70%",
              backgroundColor: Colors.white,
              padding: 10,
              borderRadius: 4,
              overflowY: 'scroll',
              height: '80%'
            }}
          >
            <h2 className="text-primary font-bold text-center">
              {selectedBook?.title}
            </h2>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Author: </p>
              <span className="mt-4 text-black">{selectedBook?.author}</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Category: </p>
              <span className="mt-4 text-black">{selectedBook?.category}</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">ISBN: </p>
              <span className="mt-4 text-black">R-0005</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Publication date: </p>
              <span className="mt-4 text-black">July, 2018</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Place: </p>
              <span className="mt-4 text-black">First Stage</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Created date: </p>
              <span className="mt-4 text-black">24/8/2024</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Can borrow: </p>
              <span className="mt-4 text-black">Yes</span>
            </div>
            <div className="flex">
              <p className="mt-4 text-black w-1/6">Description: </p>
              <span className="mt-4 text-black">A picture-book biography of Betty Robinson, who "at only sixteen
                years old ... became the first female gold medalist in track and
                field in the 1928 Olympics and an overnight sensation. She was
                set for gold again and had her eyes on the 1932 Olympics. Her
                plans changed forever when a horrible plane crash left her in a
                wheelchair, with one leg shorter than the other. But Betty
                didn't let that stop her. In less than five years, she relearned
                how to stand, to walk, and finally to run again and try to taste
                gold once more in the 1936 Olympics in Berlin"--Publisher
                marketing." -- (Source of summary not specified)
              </span>
            </div>
            <div className="flex w-full">
              {/* <button className="text-primary">Reset</button>
              <button className="bg-primary ml-auto px-2 py-1 rounded-md text-white">Search</button> */}
              <button
                onClick={handleClose}
                className="border-primary border ml-auto px-2 py-1 rounded-md text-primary"
              >
                Close
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
