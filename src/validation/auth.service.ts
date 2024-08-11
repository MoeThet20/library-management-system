import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const registerUserValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().email().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  role: Yup.string().required("Role is required"),
});

const updateUserValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().email().required("Username is required"),
  role: Yup.string().required("Role is required"),
});

export default {
  loginValidationSchema,
  registerUserValidationSchema,
  updateUserValidationSchema,
};
