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
  | { type: "submitForm" };

const useForm = <T extends Record<string, string>>(initialValues: T) => {
  const submitForm = () => ({ type: "submitForm" } as const);

  const updateValue = ({
    name,
    value,
    validationMessage = "",
  }: {
    name: keyof T;
    value: string;
    validationMessage: string | undefined;
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

    if (action.type === "submitForm") {
      const areValidationMessagesVisible = Object.fromEntries(
        Object.keys(state.areValidationMessagesVisible).map((name) => [name, true])
      ) as { [key in keyof T]: true };

      return { ...state, areValidationMessagesVisible };
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
    handleSubmit: (state: FormState<T>) => void | Promise<void>;
    rest?: unknown[];
  }) => {
    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();

      const ret = handleSubmit(state);

      if (ret instanceof Promise) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ret.then(() => dispatch(submitForm()));
      } else {
        dispatch(submitForm());
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
    validator?: (value: string) => string;
    rest?: unknown[];
  }) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
      dispatch(
        updateValue({
          name,
          value: event.target.value,
          validationMessage: validator?.(event.target.value),
        })
      );

    const onBlur: FocusEventHandler<HTMLInputElement> = () =>
      dispatch(showValidationMessage({ name }));

    return {
      label,
      name,
      value: state.values[name],
      onChange,
      onBlur,
      validationMessage: state.areValidationMessagesVisible[name]
        ? state.validationMessages[name]
        : "",
      ...rest,
    };
  };

  const keys = Object.keys(initialValues) as Array<keyof T>;

  const initialValidationMessages = Object.fromEntries(
    keys.map((key) => [key, ""])
  ) as FormState<T>["validationMessages"];

  const initialAreValidationMessagesVisible = Object.fromEntries(
    keys.map((key) => [key, false])
  ) as FormState<T>["areValidationMessagesVisible"];

  const [state, dispatch] = useReducer<typeof formReducer>(formReducer, {
    values: initialValues,
    validationMessages: initialValidationMessages,
    areValidationMessagesVisible: initialAreValidationMessagesVisible,
    isFormValid: false,
  });

  return { state, dispatch, getInputProps, getFormProps } as const;
};

export default useForm;
