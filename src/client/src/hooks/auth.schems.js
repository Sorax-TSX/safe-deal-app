import * as Y from "yup";

export const schemaFormData = Y.object().shape({
    login: Y.string()
      .required("Login is Required!")
      .min(4, "Minimum 4 characters")
      .max(20, "Maximum 20 characters")
      .matches(/^[A-Za-z0-9]+$/, "Only latin characters & numbers"),

    email: Y.string()
      .required("Login is Required!")
      .email("Email not valid"),

    password: Y.string()
      .required("Password is Required!")
      .min(4, "Minimum 4 characters")
      .max(30, "Maximum 30 characters")
      .matches(/^[A-Za-z0-9]+$/, "Only latin characters & numbers")
});
