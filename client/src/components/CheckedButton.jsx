import React from "react";
import {Form} from "react-bootstrap";

const CheckedButton = React.memo(({ type, label, value, name, id, onChange, checked}) => {
    return (
          <Form.Check
            type={type}
            label={label}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            checked={checked}
          />
    )
});

export default CheckedButton;
