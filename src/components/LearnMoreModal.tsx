import { convertDateString, DAY_MONTH_YEAR_HOUR_MINUTE } from "@/const";
import { Colors } from "@/const/colors";
import { Box, capitalize, Modal, Typography } from "@mui/material";
import React from "react";

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

type ModalType = {
  isOpen: boolean;
  handleClose: () => void;
  selectedBook: ListType | null;
};

const ONE = 1;

function LearnMoreModal({ isOpen, handleClose, selectedBook }: ModalType) {
  if (!selectedBook) return;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      className="flex items-center justify-center"
    >
      <Box
        sx={{
          width: "70%",
          backgroundColor: Colors.white,
          padding: 10,
          borderRadius: 4,
          overflowY: "scroll",
        }}
      >
        <Typography variant="h5" className="text-center text-primary">
          {selectedBook.title}
        </Typography>
        <div className="flex mt-3">
          <p className="w-1/6 mt-4 text-black">Author: </p>
          <span className="mt-4 text-black">
            <span className="font-bold">{selectedBook.author || "-"}</span>
          </span>
        </div>
        <div className="flex">
          <p className="w-1/6 mt-4 text-black">Category: </p>
          <span className="mt-4 text-black">
            {selectedBook.categories.map(
              (category, index) =>
                `${capitalize(category)}${
                  selectedBook.categories.length > ONE &&
                  selectedBook.categories.length !== index + ONE
                    ? ","
                    : ""
                }`
            )}
          </span>
        </div>
        <div className="flex">
          <p className="w-1/6 mt-4 text-black">ISBN: </p>
          <span className="mt-4 text-black">{selectedBook.isbn}</span>
        </div>
        <div className="flex">
          <p className="w-1/6 mt-4 text-black">Place: </p>
          <span className="mt-4 text-black">{selectedBook.place}</span>
        </div>
        <div className="flex">
          <p className="w-1/6 mt-4 text-black">Description: </p>
          <span className="mt-4 text-black">{selectedBook.description}</span>
        </div>
        <div className="flex w-full">
          <button
            onClick={handleClose}
            className="px-2 py-1 ml-auto border rounded-md border-primary text-primary"
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default LearnMoreModal;
