import * as React from "react";

export const useForm = (initState, schemaFormData) => {
    const [formData, setFormData] = React.useState(initState);

    const handleChange = React.useCallback(async (event) => {
        const { target: { name, value }} = event;

        const errors = await schemaFormData.validateAt(name, {[name]: value}, {abortEarly: false})
          .then(_ => ({[name]: ''}))
          .catch(convertErrors);

        setFormData((state) => ({
            values: {...state.values, [name]: value},
            errors: {...state.errors, ...errors},
        }));

    }, [schemaFormData]);

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

            callback(formData.values, errors);
        }
    };

    return [formData, handleChange, handleSubmit];
}

const convertErrors = (errors) => {
    return errors.inner.reduce((z, item) => {
        return z[item.path] ? z : {...z, [item.path]: item.message};
    }, {})
}
