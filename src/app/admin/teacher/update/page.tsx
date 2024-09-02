"use client";
import * as React from "react";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import { Formik, Form, FormikProps } from "formik";

import { Select, TextInput, Layout } from "@/components/common";

import { OCCUPATION } from "@/const";
import { useRouter } from "next/navigation";
import { Colors } from "@/const/colors";
import {
  changeTeacherPassword,
  teacherUpdate,
} from "@/services/teacher.service";
import { TEACHER_LIST } from "@/const/routes";
import {
  TEACHER_CHANGE_PASSWORD_INITIAL_VALUES,
  TEACHER_CHANGE_PASSWORD_TYPE,
  TEACHER_UPDATE_INITIAL_VALUES,
  TEACHER_UPDATE_TYPE,
} from "@/initialValues/teacher";
import { useAppSelector } from "@/hook/ReduxHooks";
import { useSession, signOut } from "next-auth/react";
import { TransitionProps } from "@mui/material/transitions";
import validation from "@/validation/teacher.service";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TeacherUpdate() {
  const changePasswordRef =
    React.useRef<FormikProps<TEACHER_CHANGE_PASSWORD_TYPE> | null>(null);
  const router = useRouter();
  const { data } = useSession();
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    React.useState(false);
  const { selectedTeacher } = useAppSelector((state) => state.teacher);
  const initialValues = selectedTeacher
    ? selectedTeacher
    : TEACHER_UPDATE_INITIAL_VALUES;

  const handleSubmit = async (values: TEACHER_UPDATE_TYPE) => {
    const res = await teacherUpdate(values);
    if (!res) return;

    router.push(TEACHER_LIST);
  };

  const isSameId = data?.user && data?.user.id === selectedTeacher?.id;

  const toggleModal = () => setIsOpenChangePasswordModal((prev) => !prev);

  const handleChangePassword = async (values: TEACHER_CHANGE_PASSWORD_TYPE) => {
    if (!selectedTeacher?.id) return;
    try {
      const request = {
        id: selectedTeacher?.id,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const res = await changeTeacherPassword(request);

      if (!res) return;

      signOut();
    } finally {
      changePasswordRef?.current?.resetForm();
      toggleModal();
    }
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
            initialValues={initialValues}
            validationSchema={validation.teacherUpdateValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
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
        {isSameId && (
          <div className="absolute right-10 top-24">
            <Button variant="outlined" onClick={toggleModal}>
              Change Password
            </Button>
          </div>
        )}
        <Dialog
          open={isOpenChangePasswordModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={toggleModal}
          fullWidth
          maxWidth={"sm"}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div>Change Password</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Formik
                innerRef={changePasswordRef}
                initialValues={TEACHER_CHANGE_PASSWORD_INITIAL_VALUES}
                validationSchema={
                  validation.teacherChangePasswordValidationSchema
                }
                onSubmit={handleChangePassword}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TextInput
                      name="password"
                      label="Password"
                      type="password"
                    />
                    <TextInput
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                    <DialogActions>
                      <Button type="submit">Change Password</Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
}
