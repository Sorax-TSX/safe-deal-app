import { schemaFormData } from "./auth.schems";
import * as React from "react";

export const useForm = (initState) => {
    const [formData, setFormData] = React.useState(initState);

    const handleChange = async (event) => {
        const {name, value} = event.target;
        const errors = await schemaFormData.validateAt(name, {[name]: value}, {abortEarly: false})
          .then(_ => ({[name]: null}))
          .catch(convertErrors);
        setFormData((state) => ({
            values: {...formData.values, [name]: value},
            errors: {...state.errors, ...errors}
        }));
    };

     const handleSubmit = (callback) => {
        return async (event) => {
            event.preventDefault();
            const errors = await schemaFormData.validate(formData.values, {abortEarly: false})
              .then(_ => ({}))
              .catch(convertErrors);
            setFormData((prevState) => ({
                ...prevState,
                errors
            }));
            if (Boolean(Object.keys(errors).length) || !Object.keys(errors).length) {
                callback(formData.values);
            }
        }
    };

    return [formData, handleChange, handleSubmit];
}

const convertErrors = (errors) => {
    return errors.inner.reduce((z, item) => {
        return z[item.path] ? z : {...z, [item.path]: item.message};
    }, {})
}
