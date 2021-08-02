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

const useForm = <T extends Record<string, string | number>>(initialValues: T) => {
  const showAllValidationMessage = () => ({ type: "showAllValidationMessage" } as const);

  const updateValue = ({
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

  const showValidationMessage = ({ name }: { name: keyof T }) =>
    ({
      type: "showValidationMessage",
      payload: { name },
    } as const);

  const reset = () => ({ type: "reset" } as const);

  const formReducer: Reducer<FormState<T>, FormAction<T>> = (state, action) => {
    console.log(action.type, JSON.stringify(action, null, 2));

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
      const keys = Object.keys(state.values) as Array<keyof T>;

      const values = Object.fromEntries(keys.map((key) => [key, ""])) as T;

      const validationMessages = Object.fromEntries(
        keys.map((key) => [key, ""])
      ) as FormState<T>["validationMessages"];

      const areValidationMessagesVisible = Object.fromEntries(
        keys.map((key) => [key, false])
      ) as FormState<T>["areValidationMessagesVisible"];

      return { values, validationMessages, areValidationMessagesVisible, isFormValid: false };
    }

    return state;
  };

  const getFormProps = ({
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

  const getInputProps = ({
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

  const getRadioProps = (...args: Parameters<typeof getInputProps>) => {
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

  const createInitialState = (values: T) => {
    const keys = Object.keys(values) as Array<keyof T>;

    const validationMessages = Object.fromEntries(
      keys.map((key) => [key, ""])
    ) as FormState<T>["validationMessages"];

    const areValidationMessagesVisible = Object.fromEntries(
      keys.map((key) => [key, false])
    ) as FormState<T>["areValidationMessagesVisible"];

    return { values, validationMessages, areValidationMessagesVisible, isFormValid: false };
  };

  const [state, dispatch] = useReducer<typeof formReducer>(
    formReducer,
    createInitialState(initialValues)
  );

  return { state, dispatch, getInputProps, getFormProps, getRadioProps, reset } as const;
};

export default useForm;
