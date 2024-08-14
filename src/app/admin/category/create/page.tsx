//  "use client";

// import React from "react";

// function BookSearch() {
//   return <div>BookSearch</div>;
// }

// export default BookSearch;

"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput, Layout } from "@/components/common";
import { Colors } from "@/const/colors";
import { YEARS } from "@/const";

export default function BookCreate() {
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
            Category Create
          </Typography>
          <Formik
            initialValues={{ name: "", password: "" }}
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
