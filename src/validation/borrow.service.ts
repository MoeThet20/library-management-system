import * as Yup from "yup";

const borrowSearchValidationSchema = Yup.object({
  startDate: Yup.date()
    .required("Start date is required")
    .nullable()
    .typeError("Start date must be a valid date"),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .typeError("End date must be a valid date")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
});

export default {
  borrowSearchValidationSchema,
};
