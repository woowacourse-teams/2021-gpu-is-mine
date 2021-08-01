import { FormHTMLAttributes } from "react";
import { jobNameValidator, expectedTimeValidator, minPerformanceValidator } from "./validator";
import { useForm, Values, usePostJobRegister } from "../../hooks";
import { Alert, Button, Dimmer, Input, Loading, Text } from "../../components";
import { StyledForm } from "./JobRegisterForm.styled";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";

interface JobRegisterFormProps extends FormHTMLAttributes<HTMLFormElement> {
  labId: number;
}

const JobRegisterForm = ({ labId, ...rest }: JobRegisterFormProps) => {
  const { status, makeRequest, done } = usePostJobRegister({ labId });

  const submitAction = async ({ jobName, expectedTime, gpuServerId }: Values) => {
    const requestBody = {
      name: String(jobName),
      expectedTime: Number(expectedTime),
      gpuServerId: Number(gpuServerId),
      metaData: "helloworld",
    };

    return (await makeRequest(requestBody)).unwrap();
  };

  const { form, reset, useInput } = useForm(submitAction);

  const jobNameInputProps = useInput("", {
    name: "jobName",
    label: "Job 이름",
    validator: jobNameValidator,
  });
  const expectedTimeInputProps = useInput("", {
    name: "expectedTime",
    label: "Job 예상 실행 시간(hour)",
    validator: expectedTimeValidator,
  });
  const minPerformanceInputProps = useInput("", {
    name: "minPerformance",
    label: "최소 필요 연산량(TFLOPS)",
    validator: minPerformanceValidator,
  });
  const metaDataInputProps = useInput("", {
    name: "metaData",
    label: "Docker Hub Url",
  });
  const gpuServerSelectProps = useInput("", {
    name: "gpuServerId",
    label: "GPU 서버 선택",
  });

  const handleConfirm = () => {
    reset();
    done();
  };

  return (
    <>
      {status === "succeed" && (
        <Alert onConfirm={handleConfirm}>
          <Text size="md" weight="bold">
            Job 등록에 성공하였습니다.
          </Text>
        </Alert>
      )}

      {status === "failed" && (
        <Alert onConfirm={done}>
          <Text size="md" weight="bold">
            Job 등록에 실패하였습니다.
          </Text>
        </Alert>
      )}

      {status === "loading" && (
        <Dimmer>
          <Loading size="lg" />
        </Dimmer>
      )}

      <StyledForm {...rest} {...form}>
        <Input size="sm" {...jobNameInputProps} />
        <Input size="sm" {...expectedTimeInputProps} />
        <Input size="sm" {...minPerformanceInputProps} />
        <Input size="sm" {...metaDataInputProps} />
        <JobRegisterRadioGroup
          {...gpuServerSelectProps}
          minPerformance={Number(minPerformanceInputProps.value)}
        />
        <Button className="submit" color="secondary" disabled={status !== "idle"}>
          제출
        </Button>
      </StyledForm>
    </>
  );
};

export default JobRegisterForm;
