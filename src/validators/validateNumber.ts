import { validateNumberParams,ValidateNumberResult } from './../helpers/types'

export const validateNumber = ({
  value,
  integer = false,
}: validateNumberParams): ValidateNumberResult => {
  const numericRegex = /^[0-9]+$/;
  const parsedValue = integer ? parseInt(value) : parseFloat(value);
  if (
    !!value.trim() &&
    (isNaN(parsedValue) || !numericRegex.test(value) || (!isNaN(parsedValue) && parsedValue < 0))
  ) {
    return {
      error: integer
        ? "Please enter a valid positive integer."
        : "Please enter a valid positive number.",
    };
  }

  return { error: "" };
};
