"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput } from "@/components/common";

import { YEARS } from "@/const";

export default function BookUpdate() {
  const handleSubmit = async (values: any) => {};

  return (
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
          initialValues={{ name: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="title" label="Title" />
              <TextInput name="author" label="Author" />
              <TextInput name="isbn" label="ISBN" />

              <Select name="categories" label="Categories" options={YEARS} />
              <TextInput name="description" label="Description" />
              <TextInput name="publication_date" label="Publication Date" />
              <TextInput name="amount" label="Amount" />
              <TextInput name="place" label="Place" />
              <TextInput name="created_by" label="Created By" />

              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
