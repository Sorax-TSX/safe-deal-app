import * as React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({label, type, name, value, placeholder, autoComplete, error, onChange}) => {
    return (
      <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
      </Form.Group>
    )
};

export default TextInput;
