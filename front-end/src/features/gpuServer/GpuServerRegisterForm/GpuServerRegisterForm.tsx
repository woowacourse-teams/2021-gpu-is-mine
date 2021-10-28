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
import { useMoveToPage, useForm, getInputProps, getFormProps } from "../../../hooks";
import { Input, Loading, Dimmer, useToast } from "../../../components";
import { StyledForm, StyledButton } from "./GpuServerRegisterForm.styled";
import type { RootState } from "../../../app/store";
import type { RequiredSerializedError } from "../../job/jobSlice";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

export type Values = {
  memorySize: number;
  diskSize: number;
  serverName: string;
  performance: number;
  modelName: string;
};

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { isLoading } = useAppSelector((state: RootState) =>
    selectGpuServerStatus(state, registerGpuServer)
  );

  const appDispatch = useAppDispatch();

  const moveToGpuServerView = useMoveToPage(PATH.GPU_SERVER.VIEW);

  const showToast = useToast();

  const { state, dispatch } = useForm<Values>({
    memorySize: "" as unknown as number,
    diskSize: "" as unknown as number,
    serverName: "",
    performance: "" as unknown as number,
    modelName: "",
  });

  const handleSubmit = async (values: Values) => {
    try {
      await appDispatch(registerGpuServer(values)).unwrap();

      showToast({
        type: "success",
        title: "서버 등록에 성공하였습니다",
        message: `${state.values.serverName}가 성공적으로 등록되었습니다`,
      });

      moveToGpuServerView();
    } catch (err) {
      const error = err as RequiredSerializedError;

      showToast({
        type: "error",
        title: error.name,
        message: error.message,
      });
    }
  };

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
