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
import {
  LOGIN_FORM_TYPE,
  LOGIN_INITIAL_VALUES,
  RFID_LOGIN_FORM_TYPE,
  RFID_LOGIN_INITIAL_VALUES,
} from "@/initialValues/auth";
import validation from "@/validation/auth.service";
import { ADMIN_DASHBOARD } from "@/const/routes";

export default function SignIn() {
  const router = useRouter();
  useRedirectIfAuthenticated();
  const [isLoginWithRFID, setIsLoginWithRFID] = React.useState(false);

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

  const handleRFIDSubmit = async (values: RFID_LOGIN_FORM_TYPE) => {
    const res = await signIn("credentials", {
      rfid: values.rfid,
      redirect: false,
    });
    if (res?.ok && res?.status === 200) {
      router.replace(ADMIN_DASHBOARD);
      return;
    }
    alert("Invalid RFID");
  };

  const toggleLogin = () => setIsLoginWithRFID((prev) => !prev);

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
        {isLoginWithRFID ? (
          <Formik
            initialValues={RFID_LOGIN_INITIAL_VALUES}
            validationSchema={validation.rfidLoginValidationSchema}
            onSubmit={handleRFIDSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput name="rfid" label="RFID Number" type="password" />
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
        ) : (
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
        )}
        <p
          className="font-medium text-blue-600 underline cursor-pointer dark:text-blue-500 hover:no-underline"
          onClick={toggleLogin}
        >
          Login with {!isLoginWithRFID ? "RFID" : "Email and Password"}
        </p>
      </Box>
    </Container>
  );
}
