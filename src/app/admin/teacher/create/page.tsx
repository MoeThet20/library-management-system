"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput, Layout } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
import { OCCUPATION } from "@/const";
import { teacherRegister } from "@/services/teacher.service";
import { useRouter } from "next/navigation";
import { Colors } from "@/const/colors";

export default function TeacherCreate() {
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
              <TextInput name="phoneNumber" label="Phone Number" />
              <TextInput name="rfid" label="RFID" />
              <Select
                name="occupation"
                label="Occupation"
                options={OCCUPATION}
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
