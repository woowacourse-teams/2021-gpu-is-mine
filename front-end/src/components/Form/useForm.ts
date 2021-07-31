import { Reducer, useReducer } from "react";

export type State = {
  values: Record<string, string>;
  validationMessages: Record<string, string>;
  areValidationMessagesVisible: Record<string, boolean>;
  isFormValid: boolean; // 하나만 valid 하게 되어도 valid하게 됨
};

export type Action =
  | {
      type: "change";
      payload: {
        name: string;
        value: string;
        validationMessage: string;
      };
    }
  | { type: "showValidationMessage"; payload: { name: string } }
  | {
      type: "submit";
    }
  | { type: "addInput"; payload: { names: string[] } };

const formReducer: Reducer<State, Action> = (state, action) => {
  console.log(action.type, JSON.stringify(action, null, 2));

  if (action.type === "change") {
    const values = {
      ...state.values,
      [action.payload.name]: action.payload.value,
    };

    const validationMessages = {
      ...state.validationMessages,
      [action.payload.name]: action.payload.validationMessage,
    };

    return {
      ...state,
      values,
      validationMessages,
      isFormValid: Object.values(validationMessages).every(
        (message) =>
          message === "" && Object.keys(validationMessages).length === Object.keys(values).length
      ) /* 보완 필요... */,
    };
  }

  if (action.type === "showValidationMessage") {
    return {
      ...state,
      areValidationMessagesVisible: {
        ...state.areValidationMessagesVisible,
        [action.payload.name]: true,
      },
    };
  }

  if (action.type === "submit") {
    const areValidationMessagesVisibleEntries = Object.entries(state.values).map(([name]) => [
      name,
      true,
    ]);

    return {
      ...state,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      areValidationMessagesVisible: Object.fromEntries(areValidationMessagesVisibleEntries),
    };
  }

  if (action.type === "addInput") {
    return {
      ...state,
      values: Object.fromEntries(action.payload.names.map((name) => [name, ""])),
    };
  }

  return state;
};

// export const useForm = () => {
export const useForm = <T extends string>(initialValues: { [name in T]: string }) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    validationMessages: {},
    areValidationMessagesVisible: {},
    isFormValid: false,
  });

  return [state, dispatch] as const;
};
