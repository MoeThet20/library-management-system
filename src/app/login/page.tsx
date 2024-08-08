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

export default function SignIn() {
  const router = useRouter();
  useRedirectIfAuthenticated();

  const handleSubmit = async (values: any) => {
    // const res = await signIn("credentials", {
    //   username: values.username,
    //   password: values.password,
    //   redirect: false,
    // });
    // if (res?.ok && res?.status === 200) {
    //   router.replace(ADMIN_DASHBOARD);
    //   return;
    // }
    // alert("Invalid Username or Password");
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
        <Image src="/next.svg" alt="Hello" width={50} height={50} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          // initialValues={LOGIN_INITIAL_VALUES}
          // validationSchema={validation.loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="username" label="Username" />
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
