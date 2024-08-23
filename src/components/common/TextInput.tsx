import React from "react";
import { Field, FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  disabled = false,
  multiline = false,
  rows,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          disabled={disabled}
          type={type}
          label={label}
          multiline={multiline}
          rows={rows}
          margin="normal"
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          variant="outlined"
          fullWidth
          autoComplete="on"
        />
      )}
    </Field>
  );
};

export default TextInput;
