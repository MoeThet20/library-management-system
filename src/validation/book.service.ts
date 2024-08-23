import * as Yup from "yup";

const bookCreateValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  isbn: Yup.string().required("Author is required"),
  categories: Yup.array()
    .required("Category is required")
    .min(1, "At least one category is required"),
  description: Yup.string().required("Description is required"),
  publicationDate: Yup.date().required("PublicationDate is required"),
  amount: Yup.number().min(1, "Amount must be greater than zero"),
  place: Yup.string().required("Place is required"),
});

export default {
  bookCreateValidationSchema,
};
