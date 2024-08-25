"use client";

import * as React from "react";
import { useFormikContext, FieldProps } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

const FormikDatePicker: React.FC<FieldProps> = (props) => {
  const { field, form } = props;

  const { setFieldValue } = useFormikContext();

  const handleChange = (newValue: any) => {
    setFieldValue(field.name, newValue);
  };

  const configDatePicker = {
    ...field,
    value: field.value ? dayjs(field.value) : null,
    onChange: handleChange,
    slotProps: {
      textField: {
        error: form.touched[field.name] && form.errors[field.name],
        helperText: form.touched[field.name] && form.errors[field.name],
        fullWidth: true,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...configDatePicker} />
    </LocalizationProvider>
  );
};

export default FormikDatePicker;
