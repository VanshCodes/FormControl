import { ValidateFunctionType } from "./TypesHelper";

export const validateUserID: ValidateFunctionType = (
  value: string | number
) => {
  return value === "0"
    ? { error: true, msg: "User ID cannot be 0" }
    : { error: false, msg: "" };
};

export const validateText: ValidateFunctionType = (value: string | number) => {
  return value === ""
    ? { error: true, msg: "Text cannot be empty" }
    : { error: false, msg: "" };
};
export const validateBody: ValidateFunctionType = (value: string | number) => {
  return value === ""
    ? { error: true, msg: "Body cannot be empty" }
    : { error: false, msg: "" };
};
