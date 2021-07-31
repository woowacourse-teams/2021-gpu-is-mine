import { FormHTMLAttributes } from "react";
import { useHistory } from "react-router-dom";
import {
  serverNameValidator,
  memorySizeValidator,
  diskSizeValidator,
  performanceValidator,
  modelNameValidator,
} from "./validator";
import { Input, Button, Text, Alert, Loading, Dimmer } from "../../components";
import { useForm, usePostGpuServer, Values } from "../../hooks";
import { StyledForm } from "./GpuServerRegisterForm.styled";
import { PATH } from "../../constants";
import { APICallStatus } from "../../types";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const GpuServerRegisterForm = (props: GpuServerRegisterFormProps) => {
  const { status, makeRequest, done } = usePostGpuServer();
  const history = useHistory();

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

  const isAlertOpen = ["succeed", "failed"].includes(status);

  const alertMessages: { [key in APICallStatus]?: string } = {
    succeed: "서버 등록에 성공하였습니다.",
    failed: "서버 등록에 실패하였습니다.",
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

  return (
    <>
      <Alert isOpen={isAlertOpen} onConfirm={handleConfirm}>
        <Text size="md" weight="bold">
          {alertMessages[status] ?? ""}
        </Text>
      </Alert>

      <StyledForm {...props} {...form}>
        {status !== "idle" && (
          <Dimmer>
            <Loading isOpen={status === "loading"} />
          </Dimmer>
        )}
        <Input size="sm" {...serverNameInputProps} />
        <Input size="sm" {...memorySizeInputProps} />
        <Input size="sm" {...diskSizeInputProps} />
        <Input size="sm" {...performanceInputProps} />
        <Input size="sm" {...modelNameInputProps} />
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
