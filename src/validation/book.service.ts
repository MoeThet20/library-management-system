import * as Yup from "yup";

const bookValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  isbn: Yup.string().required("Author is required"),
  categories: Yup.array()
    .required("Category is required")
    .min(1, "At least one category is required"),
  publicationDate: Yup.date()
    .required("PublicationDate is required")
    .max(new Date(), "Publication date cannot be in the future"),
  amount: Yup.number().min(1, "Amount must be greater than zero"),
  place: Yup.string().nullable(),
  description: Yup.string().nullable(),
});

export default {
  bookValidationSchema,
};
