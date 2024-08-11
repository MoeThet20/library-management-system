"use client";
import * as React from "react";
import { Button, CssBaseline, Box, Typography, Container } from "@mui/material";
import { Formik, Form } from "formik";

import { Select, TextInput } from "@/components/common";

import { OCCUPATION } from "@/const";
import { teacherRegister } from "@/services/teacher.service";

export default function TeacherCreate() {
  const handleSubmit = async (values: any) => {
    console.log(values);
    await teacherRegister(values);
  };

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
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            rfid: "",
            occupation: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="name" label="Name" />
              <TextInput name="email" label="Email" />
              <TextInput name="password" label="Password" type="password" />
              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
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
