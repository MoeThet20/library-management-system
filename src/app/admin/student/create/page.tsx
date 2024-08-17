"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Select, TextInput, Layout, DateRange } from "@/components/common";
import {
  STUDENT_REGISTER_INITIAL_VALUES,
  STUDENT_REGISTER_TYPE,
} from "@/initialValues/student";

import { YEARS } from "@/const";
import { Colors } from "@/const/colors";
import { studentRegister } from "@/services/student.service";
import { STUDENT_LIST } from "@/const/routes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import validation from "@/validation/student.service";

export default function StudentCreate() {
  const { data } = useSession();
  const router = useRouter();

  const handleSubmit = async (values: STUDENT_REGISTER_TYPE) => {
    if (!data?.user?.id) return;

    const request = { ...values, teacherId: data?.user?.id };
    const res = await studentRegister(request);
    if (!res) return;

    router.push(STUDENT_LIST);
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
            Student Register
          </Typography>
          <Formik
            initialValues={STUDENT_REGISTER_INITIAL_VALUES}
            validationSchema={validation.studentCreateValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="name" label="Name" />
                <TextInput
                  name="roleNumber"
                  label="Role Number"
                  type="number"
                />
                <DateRange
                  name="initialYear"
                  label="Start Year of University"
                />
                <Select
                  name="currentYear"
                  label="Current Year"
                  options={YEARS}
                />
                <TextInput name="phoneNumber" label="Phone Number" />

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
