import React from "react";
import {Form} from "react-bootstrap";

const CheckedButton = ({ type, label, value, name, id }) => {
    return (
          <Form.Check
            type={type}
            label={label}
            value={value}
            name={name}
            id={id}
          />
    )
}

export default CheckedButton;
