"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput, Layout } from "@/components/common";

import { OCCUPATION } from "@/const";
import { teacherRegister } from "@/services/teacher.service";
import { useRouter } from "next/navigation";
import { Colors } from "@/const/colors";
import { TEACHER_REGISTER_INITIAL_VALUES } from "@/initialValues/teacher";
import { TEACHER_LIST } from "@/const/routes";

export default function TeacherCreate() {
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const res = await teacherRegister(values);
    if (!res) return;

    router.push(TEACHER_LIST);
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
            initialValues={TEACHER_REGISTER_INITIAL_VALUES}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="name" label="Name" />
                <TextInput name="email" label="Email" />
                <TextInput name="rfid" label="RFID" />
                <TextInput name="phoneNumber" label="Phone Number" />
                <Select
                  name="occupation"
                  label="Occupation"
                  options={OCCUPATION}
                />
                <TextInput name="password" label="Password" type="password" />
                <TextInput
                  name="confirmPassword"
                  label="Password"
                  type="password"
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
