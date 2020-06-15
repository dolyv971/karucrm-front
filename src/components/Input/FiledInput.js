import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

const FieldInput = ({
  input,
  label,
  placeholder,
  readOnly,
  type,
  meta: { touched, error },
}) => (
  <FormGroup className="input-container">
    <Label htmlFor={label} className="input-text-label">
      {label}
    </Label>
    <Input
      {...input}
      type={type}
      id={label}
      className="input-text-content"
      placeholder={placeholder}
      readOnly={readOnly}
    />
    {touched && error && <span className="input-text-error">{error}</span>}
  </FormGroup>
);

export default FieldInput;
