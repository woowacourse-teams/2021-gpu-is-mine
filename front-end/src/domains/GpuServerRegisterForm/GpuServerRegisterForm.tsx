import { FormHTMLAttributes } from "react";
import { Input, Text, Alert, Loading, Dimmer } from "../../components";
import { StyledForm, StyledButton } from "./GpuServerRegisterForm.styled";
import useGpuServerRegisterForm, { useGoToGpuServerView } from "./useGpuServerRegisterForm";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { goToGpuServerView } = useGoToGpuServerView();
  const {
    status,
    done,
    form,
    submit,
    serverNameInputProps,
    memorySizeInputProps,
    diskSizeInputProps,
    performanceInputProps,
    modelNameInputProps,
  } = useGpuServerRegisterForm();

  return (
    <>
      {status === "succeed" && (
        <Alert onConfirm={goToGpuServerView}>
          <Text size="md" weight="bold">
            서버 등록에 성공하였습니다.
          </Text>
        </Alert>
      )}

      {status === "failed" && (
        <Alert onConfirm={done}>
          <Text size="md" weight="bold">
            서버 등록에 실패하였습니다.
          </Text>
        </Alert>
      )}

      {status === "loading" && (
        <Dimmer>
          <Loading size="lg" />
        </Dimmer>
      )}

      <StyledForm {...props} {...form}>
        <Input size="sm" {...serverNameInputProps} />
        <Input size="sm" {...memorySizeInputProps} />
        <Input size="sm" {...diskSizeInputProps} />
        <Input size="sm" {...performanceInputProps} />
        <Input size="sm" {...modelNameInputProps} />
        <StyledButton color="secondary" {...submit} disabled={submit.disabled || status !== "idle"}>
          제출
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default GpuServerRegisterForm;
