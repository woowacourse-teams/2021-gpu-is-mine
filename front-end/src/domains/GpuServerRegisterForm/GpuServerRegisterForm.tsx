import { FormHTMLAttributes } from "react";
import { useHistory } from "react-router-dom";
import { isLength, isNumber } from "../../utils";
import { Input, Button, Text, Alert, Loading, Dimmer } from "../../components";
import { useFetch, useForm, Values } from "../../hooks";
import { StyledForm } from "./GpuServerRegisterForm.styled";
import { PATH, API_ENDPOINT } from "../../constants";
import { APICallStatus, GpuServerRegisterRequest } from "../../types";

type GpuServerRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const serverNameValidator = (value: string) => {
  if (!isLength(value, { min: 1, max: 15 })) {
    return `1글자 이상 15글자 이하만 가능합니다.`;
  }

  return null;
};

const memorySizeValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1GB 이상 10,000GB 이하만 가능합니다.`;
  }

  return null;
};

const diskSizeValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1GB 이상 10,000GB 이하만 가능합니다.`;
  }

  return null;
};

const performanceValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1TFLOPS 이상 10,000TFLOPS 이하만 가능합니다.`;
  }

  return null;
};

const modelNameValidator = (value: string) => {
  if (!isLength(value, { min: 1, max: 50 })) {
    return `1글자 이상 50글자 이하만 가능합니다.`;
  }

  return null;
};

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
