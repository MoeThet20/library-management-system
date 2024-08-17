"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { DateRange, Select, TextInput } from "@/components/common";

import { YEARS } from "@/const";
import { Layout } from "@/components/common";
import { Colors } from "@/const/colors";
import {
  STUDENT_UPDATE_INITIAL_VALUES,
  STUDENT_UPDATE_TYPE,
} from "@/initialValues/student";
import { useAppSelector } from "@/hook/ReduxHooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { studentUpdate } from "@/services/student.service";
import { STUDENT_LIST } from "@/const/routes";

const FROM_YEAR = 0;
const TO_YEAR = 1;

export default function StudentUpdate() {
  const { data } = useSession();
  const router = useRouter();

  const { selectedStudent } = useAppSelector((state) => state.student);

  const handleSubmit = async (values: STUDENT_UPDATE_TYPE) => {
    if (!data?.user?.id) return;
    const request = { ...values, teacherId: data?.user?.id };
    const res = await studentUpdate(request);
    if (!res) return;

    router.push(STUDENT_LIST);
  };

  const getYear = selectedStudent?.initialYear.split("-") || [2023, 2024];

  const initialValues = selectedStudent
    ? {
        id: selectedStudent.id,
        name: selectedStudent.name,
        roleNumber: Number(selectedStudent.roleNumber),
        initialYearFromDate: new Date(getYear[FROM_YEAR]),
        initialYearToDate: new Date(getYear[TO_YEAR]),
        currentYear: selectedStudent.currentYear,
        phoneNumber: selectedStudent.phoneNumber,
      }
    : STUDENT_UPDATE_INITIAL_VALUES;

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
            Student Update
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, dirty }) => (
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
                  disabled={isSubmitting || !dirty}
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
