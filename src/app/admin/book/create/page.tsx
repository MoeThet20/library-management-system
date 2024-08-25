"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  capitalize,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

import { Select, TextInput, Layout, DatePicker } from "@/components/common";
import { Colors } from "@/const/colors";
import { getCategories } from "@/services/category.service";
import validation from "@/validation/book.service";
import {
  BOOK_CREATE_INITIAL_VALUES,
  BOOK_CREATE_TYPE,
} from "@/initialValues/book";
import { bookCreate } from "@/services/book.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BOOK_LIST } from "@/const/routes";

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

export default function BookCreate() {
  const { data } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Array<categoryType>>([]);

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
  };

  const handleSubmit = async (values: BOOK_CREATE_TYPE) => {
    if (!data?.user?.id) return;

    const request = { ...values, teacherId: data?.user?.id };
    const res = await bookCreate(request);
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
            Book Create
          </Typography>
          <Formik
            initialValues={BOOK_CREATE_INITIAL_VALUES}
            validationSchema={validation.bookValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
                <div className="my-3">
                  <Typography variant="body2">Publication Date</Typography>
                  <Field name="publicationDate" component={DatePicker} />
                </div>
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
                  disabled={isSubmitting}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: Colors.primary_color }}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Layout>
  );
}
