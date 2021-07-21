import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";

type Value = string | number;
export type Values = Record<string, Value>;
type IsValid = Record<string, boolean>;
export type SubmitAction<T, U extends Error = Error> = (values: Values) => T | Promise<T | U>;

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

    const ret = submitAction(values);

    if (ret instanceof Promise) {
      ret.then(reset).catch(() => {});
    } else {
      reset();
    }
  };

  const useInput = (
    initialValue: Value,
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
    useInput,
    form: { onSubmit },
    submit: { disabled: !isFormValid },
  };
};

export default useForm;
