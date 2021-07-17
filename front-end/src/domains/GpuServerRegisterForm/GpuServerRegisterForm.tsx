import { FormHTMLAttributes, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "../../components";
import { useFetch, useForm, SubmitAction, Values } from "../../hooks";
import { StyledForm } from "./GpuServerRegisterForm.styled";
import { PATH, API_ENDPOINT } from "../../constants";
import { GpuServerRegisterRequest } from "../../types";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { status, data, error, makeRequest, done } = useFetch<void, GpuServerRegisterRequest>(
    API_ENDPOINT.LABS(1).GPUS,
    { method: "post" }
  );

  const history = useHistory();

  const submitAction: SubmitAction = ({
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

    makeRequest(requestBody)
      .then(() => {
        alert("성공적으로 제출하였습니다.");
        history.push(PATH.MANAGER.GPU_SERVER.VIEW);
      })
      .catch(() => {
        alert("제출에 실패하였습니다.");
      })
      .finally(done);
  };

  useEffect(() => {
    if (data) {
      console.log("data: ", data);
    }

    if (error) {
      console.log("error: ", error);
    }
  }, [data, error]);

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
        disabled={submit.disabled || status === "loading"}
      >
        제출
      </Button>
    </StyledForm>
  );
};

export default GpuServerRegisterForm;
