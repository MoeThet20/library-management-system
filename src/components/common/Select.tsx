import React from "react";
import { Field, FieldProps } from "formik";
import { MenuItem, TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

const Select: React.FC<TextInputProps> = ({ name, label, options }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          select
          label={label}
          margin="normal"
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          fullWidth
        >
          {options.length > 0 &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    </Field>
  );
};

export default Select;
