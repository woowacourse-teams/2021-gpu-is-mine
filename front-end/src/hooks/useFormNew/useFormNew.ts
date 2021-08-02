import {
  useReducer,
  Reducer,
  Dispatch,
  FormEventHandler,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";

type FormState<T> = {
  values: T;
  validationMessages: Record<keyof T, string>;
  areValidationMessagesVisible: Record<keyof T, boolean>;
  isFormValid: boolean;
};

type FormAction<T> =
  | {
      type: "updateValue";
      payload: {
        name: keyof T;
        value: string;
        validationMessage: string;
      };
    }
  | { type: "showValidationMessage"; payload: { name: keyof T } }
  | { type: "showAllValidationMessage" }
  | { type: "reset" };

const createInitialState = <T>(vals: T) => {
  const keys = Object.keys(vals) as Array<keyof T>;

  const values = Object.fromEntries(keys.map((key) => [key, ""])) as unknown as T;

  const validationMessages = Object.fromEntries(
    keys.map((key) => [key, ""])
  ) as FormState<T>["validationMessages"];

  const areValidationMessagesVisible = Object.fromEntries(
    keys.map((key) => [key, false])
  ) as FormState<T>["areValidationMessagesVisible"];

  return { values, validationMessages, areValidationMessagesVisible, isFormValid: false };
};

const showAllValidationMessage = () => ({ type: "showAllValidationMessage" } as const);

const updateValue = <T>({
  name,
  value,
  validationMessage,
}: {
  name: keyof T;
  value: string;
  validationMessage: string;
}) =>
  ({
    type: "updateValue",
    payload: {
      name,
      value,
      validationMessage,
    },
  } as const);

const showValidationMessage = <T>({ name }: { name: keyof T }) =>
  ({
    type: "showValidationMessage",
    payload: { name },
  } as const);

const reset = () => ({ type: "reset" } as const);

const formReducer = <T extends Record<string, string | number>>(
  state: FormState<T>,
  action: FormAction<T>
): FormState<T> => {
  if (action.type === "updateValue") {
    const { name, value, validationMessage } = action.payload;

    const values = { ...state.values, [name]: value };
    const validationMessages = { ...state.validationMessages, [name]: validationMessage };
    const isFormValid = Object.values(validationMessages).every((message) => message === "");

    return { ...state, values, validationMessages, isFormValid };
  }

  if (action.type === "showValidationMessage") {
    const { name } = action.payload;

    const areValidationMessagesVisible = { ...state.areValidationMessagesVisible, [name]: true };

    return { ...state, areValidationMessagesVisible };
  }

  if (action.type === "showAllValidationMessage") {
    const areValidationMessagesVisible = Object.fromEntries(
      Object.keys(state.areValidationMessagesVisible).map((name) => [name, true])
    ) as { [key in keyof T]: true };

    return { ...state, areValidationMessagesVisible };
  }

  if (action.type === "reset") {
    return createInitialState(state.values);
  }

  return state;
};

export const getFormProps = <T>({
  state,
  dispatch,
  handleSubmit,
  ...rest
}: {
  state: FormState<T>;
  dispatch: Dispatch<FormAction<T>>;
  handleSubmit: (values: T) => void | Promise<void>;
  rest?: unknown[];
}) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(showAllValidationMessage());

    if (state.isFormValid) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleSubmit(state.values);
    }
  };

  return { onSubmit, ...rest };
};

export const getInputProps = <T>({
  state,
  dispatch,
  label,
  name,
  validator = (value) => (value === "" ? `${String(name)}을 입력해주세요` : ""),
  ...rest
}: {
  label: string;
  name: keyof T;
  state: FormState<T>;
  dispatch: Dispatch<FormAction<T>>;
  validator?: (value: string) => string | null;
  rest?: unknown[];
}) => {
  const onMount = () => {
    const value = String(state.values[name]);

    dispatch(
      updateValue({
        name,
        value,
        validationMessage: validator?.(value) ?? "",
      })
    );
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(
      updateValue({
        name,
        value: event.target.value,
        validationMessage: validator?.(event.target.value) ?? "",
      })
    );

  const onBlur: FocusEventHandler<HTMLInputElement> = () =>
    dispatch(showValidationMessage({ name }));

  const validationMessage = state.areValidationMessagesVisible[name]
    ? state.validationMessages[name]
    : "";

  return {
    label,
    name,
    value: state.values[name],
    onMount,
    onChange,
    onBlur,
    validationMessage,
    ...rest,
  };
};

// FIXME: T type 지정 필요
export const getRadioProps = (...args: Parameters<typeof getInputProps>) => {
  const [{ name, validator, dispatch }] = args;
  const { onChange, onBlur, ...rest } = getInputProps(...args);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(
      updateValue({
        name,
        value: event.target.value,
        validationMessage: validator?.(event.target.value) ?? "",
      })
    );
    dispatch(showValidationMessage({ name }));
  };

  return { onChange: handleChange, ...rest };
};

const useForm = <T extends Record<string, string | number>>(initialValues: T) => {
  const [state, dispatch] = useReducer<Reducer<FormState<T>, FormAction<T>>>(
    formReducer,
    createInitialState(initialValues)
  );

  const resetForm = () => dispatch(reset());

  return { state, dispatch, reset: resetForm } as const;
};

export default useForm;
