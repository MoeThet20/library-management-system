"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { TextInput, Layout } from "@/components/common";
import { Colors } from "@/const/colors";
import {
  CATEGORY_UPDATE_INITIAL_VALUES,
  CATEGORY_UPDATE_TYPE,
} from "@/initialValues/category";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hook/ReduxHooks";
import { categoryUpdate } from "@/services/category.service";
import { CATEGORY_LIST } from "@/const/routes";
import validation from "@/validation/category.service";

export default function CategoryUpdate() {
  const router = useRouter();
  const { selectedCategory } = useAppSelector((state) => state.category);

  const handleSubmit = async (values: CATEGORY_UPDATE_TYPE) => {
    const res = await categoryUpdate(values);
    if (!res) return;

    router.push(CATEGORY_LIST);
  };

  const initialValues = selectedCategory
    ? {
        id: selectedCategory.id,
        category: selectedCategory.category,
      }
    : CATEGORY_UPDATE_INITIAL_VALUES;

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
            Category Update
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validation.categoryUpdateValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <TextInput name="category" label="Category" />

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
