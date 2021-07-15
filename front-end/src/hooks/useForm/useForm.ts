import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";

type Value = string | number;
export type Values = Record<string, Value>;
type IsValid = Record<string, boolean>;
export type SubmitAction<T = void> = (values: Values) => T | Promise<T>;

interface InputOptions {
  name: string;
  label: string;
  validator?: ((value: Value) => string | null) | null;
}

const useForm = (submitAction: SubmitAction) => {
  const [values, setValues] = useState<Values>({});
  const [isValid, setIsValid] = useState<IsValid>({});

  const disabled = !Object.values(isValid).every(Boolean);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submitAction(values);
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
    submit: { disabled },
  };
};

export default useForm;
