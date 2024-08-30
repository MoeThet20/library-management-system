// Checkbox.tsx
import React from "react";
import { Field, FieldProps } from "formik";

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div>
          <input
            type="checkbox"
            id={name}
            {...field}
            checked={field.value}
            className="mr-2"
          />
          <label htmlFor={name}>{label}</label>
        </div>
      )}
    </Field>
  );
};

export default Checkbox;
