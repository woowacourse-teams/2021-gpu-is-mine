import { FormHTMLAttributes } from "react";
import { useMoveToPage, usePostGpuServer } from "../../hooks";
import useGpuServerRegisterForm from "./useGpuServerRegisterForm";
import { Input, Text, Dialog, Loading, Dimmer } from "../../components";
import { StyledForm, StyledButton } from "./GpuServerRegisterForm.styled";
import { PATH } from "../../constants";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const goToGpuServerView = useMoveToPage(PATH.GPU_SERVER.VIEW);

  const { isIdle, isLoading, isSucceed, isFailed, makeRequest, done } = usePostGpuServer({
    labId: 1,
  });

  const {
    form,
    serverNameInputProps,
    memorySizeInputProps,
    diskSizeInputProps,
    performanceInputProps,
    modelNameInputProps,
  } = useGpuServerRegisterForm(makeRequest);

  return (
    <>
      <Dialog open={isSucceed} onClose={done} onConfirm={goToGpuServerView}>
        <Text size="md" weight="bold">
          서버 등록에 성공하였습니다.
        </Text>
      </Dialog>

      <Dialog open={isFailed} onClose={done} onConfirm={done}>
        <Text size="md" weight="bold">
          서버 등록에 실패하였습니다.
        </Text>
      </Dialog>

      {isLoading && (
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
        <StyledButton color="secondary" disabled={!isIdle}>
          제출
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default GpuServerRegisterForm;
