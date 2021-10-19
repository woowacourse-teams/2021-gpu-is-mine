import { FormHTMLAttributes } from "react";
import { PATH } from "../../../constants";
import {
  serverNameValidator,
  memorySizeValidator,
  diskSizeValidator,
  performanceValidator,
  modelNameValidator,
} from "./validator";
import { registerGpuServer, selectGpuServerStatus } from "../gpuServerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useBoolean, useMoveToPage, useForm, getInputProps, getFormProps } from "../../../hooks";
import { Input, Text, Dialog, Loading, Dimmer } from "../../../components";
import { StyledForm, StyledButton } from "./GpuServerRegisterForm.styled";
import { RootState } from "../../../app/store";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

export type Values = {
  memorySize: number;
  diskSize: number;
  serverName: string;
  performance: number;
  modelName: string;
};

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { isLoading, isSucceed, isFailed, error } = useAppSelector((state: RootState) =>
    selectGpuServerStatus(state, registerGpuServer)
  );

  const appDispatch = useAppDispatch();

  const moveToGpuServerView = useMoveToPage(PATH.GPU_SERVER.VIEW);

  const [isDialogOpen, openDialog, closeDialog] = useBoolean(false);

  const handleSuccessConfirm = () => {
    moveToGpuServerView();
    closeDialog();
  };

  const handleSubmit = async (values: Values) => {
    await appDispatch(registerGpuServer(values));
    openDialog();
  };

  const { state, dispatch } = useForm<Values>({
    memorySize: "" as unknown as number,
    diskSize: "" as unknown as number,
    serverName: "",
    performance: "" as unknown as number,
    modelName: "",
  });

  const form = getFormProps({ state, dispatch, handleSubmit });

  const serverNameInputProps = getInputProps({
    state,
    dispatch,
    name: "serverName",
    label: "서버 이름",
    validator: serverNameValidator,
  });

  const memorySizeInputProps = getInputProps({
    state,
    dispatch,
    name: "memorySize",
    label: "RAM 용량(GB)",
    validator: memorySizeValidator,
  });

  const diskSizeInputProps = getInputProps({
    state,
    dispatch,
    name: "diskSize",
    label: "디스크 용랑(GB)",
    validator: diskSizeValidator,
  });

  const performanceInputProps = getInputProps({
    state,
    dispatch,
    name: "performance",
    label: "성능(TFLOPS)",
    validator: performanceValidator,
  });

  const modelNameInputProps = getInputProps({
    state,
    dispatch,
    name: "modelName",
    label: "GPU 장치명",
    validator: modelNameValidator,
  });

  return (
    <>
      {isDialogOpen && (
        <>
          <Dialog open={isSucceed} onClose={closeDialog} onConfirm={handleSuccessConfirm}>
            <Text size="md" weight="bold">
              서버 등록에 성공하였습니다.
            </Text>
          </Dialog>

          <Dialog open={isFailed} onClose={closeDialog} onConfirm={closeDialog}>
            <Text size="md" weight="bold">
              서버 등록에 실패하였습니다.
            </Text>
            <Text size="sm" weight="medium">
              {/* TODO: 왜 서버 등록에 실패하였는지 기술. 디렉션 제공 */}
              {error?.message}
            </Text>
          </Dialog>
        </>
      )}

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
        <StyledButton color="secondary" disabled={isLoading}>
          제출
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default GpuServerRegisterForm;
