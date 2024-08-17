import * as Yup from "yup";

const studentCreateValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  roleNumber: Yup.number().min(1, "Role Number must be greater than Zero"),
  currentYear: Yup.string().required("Current year is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

export default {
  studentCreateValidationSchema,
};
