"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput, Layout } from "@/components/common";

import { OCCUPATION } from "@/const";
import { useRouter } from "next/navigation";
import { Colors } from "@/const/colors";
import { teacherUpdate } from "@/services/teacher.service";
import { TEACHER_LIST } from "@/const/routes";
import {
  TEACHER_UPDATE_INITIAL_VALUES,
  TEACHER_UPDATE_TYPE,
} from "@/initialValues/teacher";

export default function TeacherUpdate() {
  const router = useRouter();

  const handleSubmit = async (values: TEACHER_UPDATE_TYPE) => {
    const res = await teacherUpdate(values);
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
            Teacher Update
          </Typography>
          <Formik
            initialValues={TEACHER_UPDATE_INITIAL_VALUES}
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
