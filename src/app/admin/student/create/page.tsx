"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";
import { Select, TextInput,Layout } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
import { YEARS } from "@/const";
import { Colors } from "@/const/colors";

export default function StudentCreate() {

  const handleSubmit = async (values: any) => {};

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
          Student Create
        </Typography>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="name" label="Name" />
              <TextInput name="role_no" label="Role Number" />
              <Select
                name="current_year"
                label="Current Year"
                options={YEARS}
              />
              <TextInput name="created_by" label="Created by" />

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
