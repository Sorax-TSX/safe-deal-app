import { schemaFormData } from "./auth.schems";

export const useHandleChange = ([dataForm, setDataForm]) => async (event) => {
    const {name, value} = event.target;
    const errors = await schemaFormData.validateAt(name, {[name]: value}, {abortEarly: false})
      .then(_ => ({[name]: null}))
      .catch(convertErrors);
    setDataForm((state) => ({
        values: {...dataForm.values, [name]: value},
        errors: {...state.errors, ...errors}
    }));
};

export const useHandleSubmit = ([dataForm, setDataForm]) => (callback) => {
    return async function (event) {
        event.preventDefault();
        const errors = await schemaFormData.validate(dataForm.values, {abortEarly: false})
          .then(_ => ({}))
          .catch(convertErrors);
        setDataForm((prevState) => ({
            ...prevState,
            errors
        }));
        if (Boolean(Object.keys(errors).length) || !Object.keys(errors).length) {
            callback(dataForm.values);
        }
    }
};

const convertErrors = (errors) => {
    return errors.inner.reduce((z, item) => {
        return z[item.path] ? z : {...z, [item.path]: item.message};
    }, {})
}
