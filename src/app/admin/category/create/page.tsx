"use client";

import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { TextInput, Layout } from "@/components/common";
import { Colors } from "@/const/colors";
import {
  CATEGORY_CREATE_INITIAL_VALUES,
  CATEGORY_CREATE_TYPE,
} from "@/initialValues/category";
import validation from "@/validation/category.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CATEGORY_LIST } from "@/const/routes";
import { categoryCreate } from "@/services/category.service";

export default function BookCreate() {
  const { data } = useSession();
  const router = useRouter();

  const handleSubmit = async (values: CATEGORY_CREATE_TYPE) => {
    if (!data?.user?.id) return;

    const request = { ...values, teacherId: data?.user?.id };
    const res = await categoryCreate(request);
    if (!res) return;

    router.push(CATEGORY_LIST);
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
            Category Create
          </Typography>
          <Formik
            initialValues={CATEGORY_CREATE_INITIAL_VALUES}
            validationSchema={validation.categoryCreateValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="category" label="Category" />
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
