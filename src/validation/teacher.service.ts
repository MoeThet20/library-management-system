import * as Yup from "yup";

const teacherCreateValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  rfid: Yup.string().required("RFID is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  occupation: Yup.string().required("Occupation is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const teacherUpdateValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  rfid: Yup.string().required("RFID is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  occupation: Yup.string().required("Occupation is required"),
  email: Yup.string().email().required("Email is required"),
});

const teacherChangePasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Confirm Password is required"),
});

export default {
  teacherCreateValidationSchema,
  teacherUpdateValidationSchema,
  teacherChangePasswordValidationSchema,
};
