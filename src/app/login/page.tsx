"use client";
import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/common";

import useRedirectIfAuthenticated from "@/hook/useRedirectIfAuthenticated";
import { LOGIN_FORM_TYPE, LOGIN_INITIAL_VALUES } from "@/initialValues/auth";
import validation from "@/validation/auth.service";
import { ADMIN_DASHBOARD } from "@/const/routes";

export default function SignIn() {
  const router = useRouter();
  // useRedirectIfAuthenticated();

  const handleSubmit = async (values: LOGIN_FORM_TYPE) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.ok && res?.status === 200) {
      router.replace(ADMIN_DASHBOARD);
      return;
    }
    alert("Invalid Username or Password");
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
        <Image
          src="/logo.jpg"
          alt="Hello"
          width={200}
          height={200}
          className="mb-5"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={LOGIN_INITIAL_VALUES}
          validationSchema={validation.loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="email" label="Email" />
              <TextInput name="password" label="Password" type="password" />
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
