export interface InputType {
  name: string;
  type: string;
  label: string;
  selectValues?: any[];
}

export type ValidateFunctionType = (value: string | number) => {
  error: boolean;
  msg: string;
};
export interface FormValue {
  value: string | number;
  errorMSG?: string;
  validateErrorFunctions?: ValidateFunctionType[];
}

export interface newInitValue {
  [key: string]: FormValue;
  // number | string;
}

export interface ErrorType {
  [key: string]: string | undefined;
}
