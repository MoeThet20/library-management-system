import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const rfidLoginValidationSchema = Yup.object({
  rfid: Yup.string().required("RFID is required"),
});

export default {
  loginValidationSchema,
  rfidLoginValidationSchema,
};
