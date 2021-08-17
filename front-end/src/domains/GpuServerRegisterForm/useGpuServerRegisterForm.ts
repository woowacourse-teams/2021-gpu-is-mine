import {
  serverNameValidator,
  memorySizeValidator,
  diskSizeValidator,
  performanceValidator,
  modelNameValidator,
} from "./validator";
import { useForm, getInputProps, getFormProps } from "../../hooks";
import { APIFunctions, GpuServerRegisterRequest } from "../../types";

type Values = {
  memorySize: number;
  diskSize: number;
  serverName: string;
  performance: number;
  modelName: string;
};

const useGpuServerRegisterForm = (
  onSubmit: APIFunctions<void, GpuServerRegisterRequest>["makeRequest"]
) => {
  const { state, dispatch } = useForm<Values>({
    memorySize: "" as unknown as number,
    diskSize: "" as unknown as number,
    serverName: "",
    performance: "" as unknown as number,
    modelName: "",
  });

  const handleSubmit = ({ memorySize, diskSize, serverName, performance, modelName }: Values) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onSubmit({ memorySize, diskSize, serverName, gpuBoardRequest: { performance, modelName } });
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

  return {
    form,
    serverNameInputProps,
    memorySizeInputProps,
    diskSizeInputProps,
    performanceInputProps,
    modelNameInputProps,
  };
};

export default useGpuServerRegisterForm;
