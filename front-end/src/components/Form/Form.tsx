import { ChangeEvent, Dispatch, FC, FocusEvent, FormEvent } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Action, State, useForm } from "./useForm";

const getFormProps = ({
  state: currState,
  dispatch: currDispatch,
  handleSubmit,
}: {
  state: State;
  dispatch: Dispatch<Action>;
  handleSubmit: (state: State) => void | Promise<void>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ret = handleSubmit(currState);

    if (ret instanceof Promise) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ret.then(() => currDispatch({ type: "submit" }));
    } else {
      currDispatch({ type: "submit" });
    }
  };

  return { onSubmit };
};

const getInputProps = ({
  state: currState,
  dispatch: currDispatch,
  label,
  name,
  validator = (value) => (value === "" ? "공백불가요" : ""),
}: {
  label: string;
  name: string;
  state: State;
  dispatch: Dispatch<Action>;
  validator?: (value: string) => string;
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    currDispatch({
      type: "change",
      payload: {
        name: event.target.name,
        value: event.target.value,
        validationMessage: validator?.(event.target.value) ?? "",
      },
    });

  const onBlur = (event: FocusEvent<HTMLInputElement>) =>
    currDispatch({
      type: "showValidationMessage",
      payload: {
        name: event.target.name,
      },
    });

  return {
    label,
    name,
    value: currState.values[name],
    onChange,
    onBlur,
    validationMessage: currState.areValidationMessagesVisible[name]
      ? currState.validationMessages[name]
      : "",
  };
};

const Form: FC = (props) => {
  const [state, dispatch] = useForm({ password: "", passwordConfirm: "", email: "" });

  console.log(JSON.stringify(state, null, 2));

  const passwordInputProps = getInputProps({
    label: "비밀번호",
    name: "password",
    state,
    dispatch,
    validator: (value) => (value.length < 5 ? "5자 이상 필수" : ""),
  });

  const passwordConfirmInputProps = getInputProps({
    label: "비밀번호 확인",
    name: "passwordConfirm",
    state,
    dispatch,
    validator: (value) =>
      value === passwordInputProps.value ? "" : "비밀번호와 비밀번호 확인은 일치하여야 합니다",
  });

  return (
    <form
      {...props}
      {...getFormProps({ handleSubmit: () => console.log("submitted"), state, dispatch })}
    >
      <Input
        {...getInputProps({
          label: "이메일",
          name: "email",
          state,
          dispatch,
          validator: (value) => (value.length < 5 ? "5자 이상 필수" : ""),
        })}
      />
      <Input {...passwordInputProps} />
      <Input {...passwordConfirmInputProps} />
      <Button type="submit" color="secondary">
        제출
      </Button>
    </form>
  );
};

export default Form;
