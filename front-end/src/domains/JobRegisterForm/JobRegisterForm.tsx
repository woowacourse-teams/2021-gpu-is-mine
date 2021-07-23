import { FormHTMLAttributes } from "react";
import { useFetch, useForm, Values } from "../../hooks";
import { Alert, Button, Dimmer, Input, Loading, Text } from "../../components";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";
import { StyledForm } from "./JobRegisterForm.styled";
import { API_ENDPOINT } from "../../constants";
import { APICallStatus, JobRegisterRequest } from "../../types";
import { isLength } from "../../utils";

type JobRegisterFormProps = FormHTMLAttributes<HTMLFormElement>;

const jobNameValidator = (value: string) => {
  const min = 1;
  const max = 30;

  if (!isLength(value, { min, max })) {
    return `${min}글자 이상 ${max}글자 이하만 가능합니다.`;
  }

  return null;
};

const JobRegisterForm = (props: JobRegisterFormProps) => {
  const { status, makeRequest, done } = useFetch<void, JobRegisterRequest>(
    API_ENDPOINT.LABS(1).JOBS,
    {
      method: "post",
    }
  );

  const submitAction = async ({ jobName, expectedTime, gpuServerId }: Values) => {
    const requestBody = {
      name: String(jobName),
      expectedTime: Number(expectedTime),
      gpuServerId: Number(gpuServerId),
      metaData: "helloworld",
    };

    return (await makeRequest(requestBody)).unwrap();
  };

  const { form, submit, reset, useInput } = useForm(submitAction);

  const jobNameInputProps = useInput("", {
    name: "jobName",
    label: "Job 이름",
    validator: jobNameValidator,
  });
  const expectedTimeInputProps = useInput("", {
    name: "expectedTime",
    label: "Job 예상 실행 시간(hour)",
  });
  const minPerformanceInputProps = useInput("", {
    name: "minPerformance",
    label: "최소 필요 연산량(TFLOPS)",
  });
  const metaDataInputProps = useInput("", {
    name: "metaData",
    label: "Docker Hub Url",
  });
  const gpuServerSelectProps = useInput("", {
    name: "gpuServerId",
    label: "GPU 서버 선택",
  });

  const isAlertOpen = ["succeed", "failed"].includes(status);

  const alertMessages: { [key in APICallStatus]?: string } = {
    succeed: "Job 등록에 성공하였습니다.",
    failed: "Job 등록에 실패하였습니다.",
  };

  const handleConfirm = () => {
    if (status === "succeed") {
      reset();
    }
    done();
  };

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

        <Input size="sm" {...jobNameInputProps} />
        <Input size="sm" {...expectedTimeInputProps} />
        <Input size="sm" {...minPerformanceInputProps} />
        <Input size="sm" {...metaDataInputProps} />
        <JobRegisterRadioGroup
          {...gpuServerSelectProps}
          minPerformance={Number(minPerformanceInputProps.value)}
        />
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

export default JobRegisterForm;
