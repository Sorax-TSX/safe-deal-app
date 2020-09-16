import * as Y from "yup";

export const schemaFormAuth = Y.object().shape({
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

export const schemaFormOrder = Y.object().shape({
    description: Y.string()
        .required("Order name is Required!")
        .min(5, "Minimum 4 characters")
        .max(50, "Maximum 50 characters")
        .matches(/^[A-Za-zА-Яа-яЁё0-9 ]+$/, "Only latin, cyrillic characters & numbers"),

    partner: Y.string()
        .required("Login is Required!")
        .min(4, "Minimum 4 characters")
        .max(20, "Maximum 20 characters")
        .matches(/^[A-Za-z0-9]+$/, "Only latin characters & numbers"),

    role: Y.string()
        .required("Role is Required!"),

    amount: Y.number()
        .required("Amount is Required!")
        .min(100, "Minimum 100 currency")
        .max(100000, "Maximum 100 000 currency")
});

export const schemaFormBalance = Y.object().shape({

    amount: Y.number()
        .required("Amount is Required!")
        .min(100, "Minimum 100 currency")
        .max(100000, "Maximum 100 000 currency")
});
