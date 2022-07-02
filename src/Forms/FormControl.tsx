import React from "react";
import { ErrorType, newInitValue, ValidateFunctionType } from "../Helpers/Constants";

export default function useForm({
  initialValues,
  onSubmit,
}: {
  initialValues: newInitValue;
  onSubmit?: (values: newInitValue) => void;
}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<ErrorType>({});

  const validateValueAndSetError = ({
    name,
    value,
  }: {
    name: string;
    value: string | number;
  }) => {
    let errors = values[name].validateErrorFunctions?.some(
      (func: ValidateFunctionType) => {
        const { error, msg } = func(value);
        if (error) {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              [name]: msg,
            };
          });

          return false;
        }
        return true;
      }
    );
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: {
          ...prevValues[name],
          value,
        },
      };
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    validateValueAndSetError({ name, value });
  };

  const onSubmitFormWithAddedValidation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const errors = Object.keys(values).map((key) => {
      const error = validateValueAndSetError({
        name: key,
        value: values[key].value,
      });
      return error;
    }, {});

    if (Object.values(errors).some((error) => !error)) {
      console.log("Error");
      return;
    }

    if (!onSubmit) {
      return;
    }
    await onSubmit(values);
  };

  return {
    values,
    handleChange,
    setErrors,
    errors,
    onSubmitFormWithAddedValidation,
  };
}
