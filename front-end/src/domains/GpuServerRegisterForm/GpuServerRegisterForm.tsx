import { FormHTMLAttributes, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "../../components";
import useForm, { SubmitAction, Values } from "../../hooks/useForm/useForm";
import useFetch from "../../hooks/useFetch/useFetch";
import { StyledForm } from "./GpuServerRegisterForm.styled";
import { GpuServerRegisterRequest } from "../../types/gpuServer";
import PATH from "../../constants/path";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { status, data, error, makeRequest, done } = useFetch<void, GpuServerRegisterRequest>(
    "http://3.35.169.99:8080/api/labs/1/gpus",
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
