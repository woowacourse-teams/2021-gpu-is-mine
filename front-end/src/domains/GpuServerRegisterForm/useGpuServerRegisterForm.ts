import { useHistory } from "react-router-dom";
import {
  serverNameValidator,
  memorySizeValidator,
  diskSizeValidator,
  performanceValidator,
  modelNameValidator,
} from "./validator";
import { useForm, usePostGpuServer, Values } from "../../hooks";
import { PATH } from "../../constants";

export const useGoToGpuServerView = () => {
  const history = useHistory();

  const goToGpuServerView = () => history.push(PATH.MANAGER.GPU_SERVER.VIEW);

  return { goToGpuServerView };
};

const useGpuServerRegisterForm = () => {
  const { status, makeRequest, done } = usePostGpuServer();

  const submitAction = async ({
    memorySize,
    diskSize,
    serverName,
    performance,
    modelName,
  }: Values) => {
    const requestBody = {
      memorySize: Number(memorySize),
      diskSize: Number(diskSize),
      serverName: String(serverName),
      gpuBoardRequest: {
        performance: Number(performance),
        modelName: String(modelName),
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return (await makeRequest(requestBody)).unwrap();
  };

  const { form, submit, useInput } = useForm(submitAction);

  const serverNameInputProps = useInput("", {
    name: "serverName",
    label: "서버 이름",
    validator: serverNameValidator,
  });
  const memorySizeInputProps = useInput("", {
    name: "memorySize",
    label: "RAM 용량(GB)",
    validator: memorySizeValidator,
  });
  const diskSizeInputProps = useInput("", {
    name: "diskSize",
    label: "디스크 용랑(GB)",
    validator: diskSizeValidator,
  });
  const performanceInputProps = useInput("", {
    name: "performance",
    label: "성능(TFLOPS)",
    validator: performanceValidator,
  });
  const modelNameInputProps = useInput("", {
    name: "modelName",
    label: "GPU 장치명",
    validator: modelNameValidator,
  });

  return {
    status,
    done,
    form,
    submit,
    serverNameInputProps,
    memorySizeInputProps,
    diskSizeInputProps,
    performanceInputProps,
    modelNameInputProps,
  };
};

export default useGpuServerRegisterForm;
