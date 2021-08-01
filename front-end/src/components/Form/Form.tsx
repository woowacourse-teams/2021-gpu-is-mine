import { FC } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import useForm from "./useForm";

const Form: FC = (props) => {
  const { state, dispatch, getInputProps, getFormProps } = useForm({
    password: "",
    passwordConfirm: "",
    email: "",
  });

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
