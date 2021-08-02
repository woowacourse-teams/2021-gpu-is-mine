import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";

export type Values<T extends string = string> = { [key in T]: string };
type IsValid<T extends string = string> = { [key in T]: boolean };
export type SubmitAction<T = void> = (values: Values) => T | Promise<T>;

export interface InputOptions {
  name: string;
  label: string;
  validator?: ((value: string) => string | null) | null;
}

const useForm = <T>(submitAction: SubmitAction<T>) => {
  const [values, setValues] = useState<Values>({});
  const [isValid, setIsValid] = useState<IsValid>({});

  const isFormValid =
    Object.keys(isValid).length === Object.keys(values).length &&
    Object.values(isValid).every(Boolean);

  const reset = () => {
    const entries = Object.keys(values).map((key) => [key, ""]);

    setValues(Object.fromEntries(entries));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submitAction(values);
  };

  const useInput = (
    initialValue: string,
    {
      name,
      label,
      validator = (value) => (value === "" ? `${label}을 입력해주세요.` : null),
    }: InputOptions
  ) => {
    const [validationMessage, setValidationMessage] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [name]: event.target.value });

    const onBlur = (event: FocusEvent<HTMLInputElement>) => {
      const message = validator?.(event.target.value) ?? "";

      setValidationMessage(message);
      setIsValid({ ...isValid, [name]: !message });
    };

    useEffect(() => {
      setValues({ ...values, [name]: initialValue });
    }, [initialValue, name]);

    return {
      name,
      value: values[name] ?? initialValue,
      label,
      onChange,
      onBlur,
      validationMessage,
    };
  };

  return {
    values,
    isValid,
    reset,
    useInput,
    form: { onSubmit },
    submit: { disabled: false },
  };
};

export default useForm;
