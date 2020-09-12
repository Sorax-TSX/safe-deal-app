import * as React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({type, name, value, placeholder, autoComplete, error, onChange}) => {
    return (
      <Form.Group>
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
