import { ValidateFunctionType } from "./Components/Constants";

export const validateUserID: ValidateFunctionType = (
  value: string | number
) => {
  console.log("Running Validation For User ID", [value]);
  return value === "0"
    ? { error: true, msg: "User ID cannot be 0" }
    : { error: false, msg: "" };
};

export const validateText: ValidateFunctionType = (value: string | number) => {
  console.log("Running Validation For Text", [value]);
  return value === ""
    ? { error: true, msg: "Text cannot be empty" }
    : { error: false, msg: "" };
};
export const validateBody: ValidateFunctionType = (value: string | number) => {
  console.log("Running Validation For Text", [value]);
  return value === ""
    ? { error: true, msg: "Body cannot be empty" }
    : { error: false, msg: "" };
};
