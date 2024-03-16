import * as yup from "yup";

export const createUser = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required().min(6, "Password must be at least 6 characters")
});

export const updateUser = yup.object().shape({
    name: yup.string(),
    password: yup.string().min(6, "Password must be at least 6 characters")
});