import * as Yup from "yup";

const categoryCreateValidationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

export default {
  categoryCreateValidationSchema,
};
