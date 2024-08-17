"use client";

import React, { useEffect } from "react";
import { useField, useFormikContext, FieldProps, Field } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

const selectedYear = 2000;
const currentYear = new Date().getFullYear();
const FIRST_INDEX = 0;

const FormikDateRangePicker: React.FC<FieldProps> = (props) => {
  const { field, form } = props;
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (newValue: any) => {
    setFieldValue(field.name, newValue);
    const desireName = field.name.split("FromDate")[FIRST_INDEX];

    if (field.name === `${desireName}FromDate`) {
      const nextYear = newValue
        ? dayjs(newValue).add(1, "year").startOf("year")
        : null;
      setFieldValue(`${desireName}ToDate`, nextYear);
    }
  };

  const desireName = field.name.split("ToDate")[FIRST_INDEX];

  const configDatePicker = {
    ...field,
    views: ["year"],
    value: field.value ? dayjs(field.value) : null,
    onChange: handleChange,
    minDate: dayjs(`${selectedYear}-12-31`),
    maxDate: dayjs(`${currentYear}-12-31`),
    disabled: field.name === `${desireName}ToDate`,
    slotProps: {
      textField: {
        error: form.touched[field.name] && form.errors[field.name],
        helperText: form.touched[field.name] && form.errors[field.name],
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...configDatePicker} />
    </LocalizationProvider>
  );
};

const DateRange = ({ name, label }: { name: string; label: string }) => {
  return (
    <div>
      <Typography variant="caption">{label}</Typography>
      <div className="flex">
        <div className="mr-2">
          <Field name={`${name}FromDate`} component={FormikDateRangePicker} />
        </div>
        <div className="ml-2">
          <Field name={`${name}ToDate`} component={FormikDateRangePicker} />
        </div>
      </div>
    </div>
  );
};

export default DateRange;
