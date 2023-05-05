import { ErrorMessage, Field } from "formik";
import React, { InputHTMLAttributes } from "react";
import "./TextField.scss";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const TextField: React.FC<ITextField> = ({ name, label, ...rest }) => {
  return (
    <div className="form_input">
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest} />
      <ErrorMessage name={name} component={"div"} className="error_input" />
    </div>
  );
};

export default TextField;
