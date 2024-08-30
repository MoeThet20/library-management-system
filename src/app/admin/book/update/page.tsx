"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  capitalize,
} from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput, Layout, DateRange } from "@/components/common";
import { Colors } from "@/const/colors";
import {
  BOOK_UPDATE_INITIAL_VALUES,
  BOOK_UPDATE_TYPE,
} from "@/initialValues/book";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hook/ReduxHooks";
import { getCategories } from "@/services/category.service";
import { BOOK_LIST } from "@/const/routes";
import validation from "@/validation/book.service";
import { bookUpdate } from "@/services/book.service";

type ListType = {
  id: string;
  category: string;
  createdBy: string;
  createdDate: string;
};

type categoryType = {
  value: string;
  label: string;
};

const ZERO = 0;
const FROM_YEAR = 0;
const TO_YEAR = 1;

export default function BookUpdate() {
  const router = useRouter();
  const { selectedBook } = useAppSelector((state) => state.book);
  const [categories, setCategories] = useState<Array<categoryType>>([]);
  const [initialValues, setInitialValues] = useState<BOOK_UPDATE_TYPE>(
    BOOK_UPDATE_INITIAL_VALUES
  );

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const categoriesRes: Array<ListType> = await getCategories();
    const categories =
      categoriesRes.length === ZERO
        ? []
        : categoriesRes.map((category) => ({
            value: category.id,
            label: capitalize(category.category),
          }));
    setCategories(categories);

    const getYear = selectedBook?.publicationDate.split("-") || [2023, 2024];

    const initialValues =
      categories.length > ZERO && selectedBook
        ? {
            id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.author,
            isbn: selectedBook.isbn,
            categories: getCategoriesByCategory(
              categories,
              selectedBook.categories
            ),
            description: selectedBook.description,
            publicationDateFromDate: new Date(getYear[FROM_YEAR]),
            publicationDateToDate: new Date(getYear[TO_YEAR]),
            amount: selectedBook.amount,
            place: selectedBook.place,
            teacherId: selectedBook.teacherId,
          }
        : BOOK_UPDATE_INITIAL_VALUES;

    setInitialValues(initialValues);
  };

  const getCategoriesByCategory = (
    categories: Array<categoryType>,
    ids: Array<String>
  ) => {
    return categories
      .filter((item) => ids.includes(item.label.toLowerCase()))
      .map((item) => item.value);
  };

  const handleSubmit = async (values: BOOK_UPDATE_TYPE) => {
    const res = await bookUpdate(values);
    if (!res) return;

    router.push(BOOK_LIST);
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
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
            Book Update
          </Typography>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validation.bookValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <TextInput name="title" label="Title" />
                <TextInput name="author" label="Author" />
                <TextInput name="isbn" label="ISBN" />
                <Select
                  name="categories"
                  label="Categories"
                  multiple
                  options={categories}
                />
                <DateRange name="publicationDate" label="Publication Date" />
                <TextInput name="amount" label="Number of book" type="number" />
                <TextInput name="place" label="Place" multiline rows={3} />
                <TextInput
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: Colors.primary_color }}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Layout>
  );
}
