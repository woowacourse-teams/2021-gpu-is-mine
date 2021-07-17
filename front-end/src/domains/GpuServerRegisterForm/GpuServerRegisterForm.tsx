import { FormHTMLAttributes } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Text, Alert } from "../../components";
import { useFetch, useForm, Values } from "../../hooks";
import { StyledForm } from "./GpuServerRegisterForm.styled";
import { PATH, API_ENDPOINT } from "../../constants";
import { APICallStatus, GpuServerRegisterRequest } from "../../types";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { status, makeRequest, done } = useFetch<void, GpuServerRegisterRequest>(
    API_ENDPOINT.LABS(1).GPUS,
    { method: "post" }
  );

  const history = useHistory();

  const submitAction = async ({
    memorySize,
    diskSize,
    serverName,
    performance,
    deviceName,
  }: Values) => {
    const requestBody = {
      memorySize: Number(memorySize),
      diskSize: Number(diskSize),
      serverName: String(serverName),
      gpuBoardRequest: {
        performance: Number(performance),
        modelName: String(deviceName),
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return (await makeRequest(requestBody)).unwrap();
  };

  const isAlertOpen = ["succeed", "failed"].includes(status);
  const getAlertMessage = (postStatus: APICallStatus) => {
    switch (postStatus) {
      case "succeed":
        return "서버 등록에 성공하였습니다.";
      case "failed":
        return "서버 등록에 실패하였습니다.";
      default:
        return "";
    }
  };

  const handleConfirm = () => {
    if (status === "succeed") {
      history.push(PATH.MANAGER.GPU_SERVER.VIEW);
    }

    done();
  };

  const { form, submit, useInput } = useForm(submitAction);

  const serverNameInputProps = useInput("", {
    name: "serverName",
    label: "서버 이름",
  });
  const memorySizeInputProps = useInput("", {
    name: "memorySize",
    label: "RAM 용량(GB)",
  });
  const diskSizeInputProps = useInput("", {
    name: "diskSize",
    label: "디스크 용랑(GB)",
  });
  const performanceInputProps = useInput("", {
    name: "performance",
    label: "성능(TFLOPS)",
  });
  const deviceNameInputProps = useInput("", {
    name: "modelName",
    label: "GPU 장치명",
  });

  return (
    <>
      <Alert isOpen={isAlertOpen} onConfirm={handleConfirm}>
        <Text size="md" weight="bold">
          {getAlertMessage(status)}
        </Text>
      </Alert>
      <StyledForm {...props} {...form}>
        <Input size="sm" {...serverNameInputProps} />
        <Input size="sm" {...memorySizeInputProps} />
        <Input size="sm" {...diskSizeInputProps} />
        <Input size="sm" {...performanceInputProps} />
        <Input size="sm" {...deviceNameInputProps} />
        <Button
          className="submit"
          color="secondary"
          {...submit}
          disabled={submit.disabled || status !== "idle"}
        >
          제출
        </Button>
      </StyledForm>
    </>
  );
};

export default GpuServerRegisterForm;
