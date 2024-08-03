"use client";
import * as React from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
import {OCCUPATION} from "@/const"

export default function TeacherCreate() {
  useRedirectIfAuthenticated();

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
          Teacher Create
        </Typography>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="name" label="Name" />
              <TextInput name="password" label="Password" type="password" />
              <TextInput name="phone_number" label="Phone Number" />
              <Select name="occupation" label="Occupation" options={OCCUPATION} />
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
