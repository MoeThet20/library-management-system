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

import { Select, TextInput, Layout } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
import { OCCUPATION } from "@/const";
import { useRouter } from "next/navigation";
import { Colors } from "@/const/colors";



export default function TeacherUpdate() {
  const router = useRouter()

  const handleSubmit = async (values: any) => {
      await teacherRegister(values);
      router.push('/admin/teacher/list')
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
          Teacher Update
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
