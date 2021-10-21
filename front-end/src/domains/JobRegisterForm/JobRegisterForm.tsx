import { FormHTMLAttributes, useState } from "react";
import {
  dockerHubImageValidator,
  expectedTimeValidator,
  jobNameValidator,
  minPerformanceValidator,
} from "./validator";
import { getFormProps, getInputProps, useForm, usePostJobRegister } from "../../hooks";
import { Dialog, Button, Dimmer, Input, Loading, Text } from "../../components";
import { StyledForm } from "./JobRegisterForm.styled";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";
import { Values } from "./JobRegisterForm.type";

interface JobRegisterFormProps extends FormHTMLAttributes<HTMLFormElement> {
  labId: number;
}

const JobRegisterForm = ({ labId, ...rest }: JobRegisterFormProps) => {
  const { isIdle, isLoading, isFailed, isSucceed, makeRequest, done } = usePostJobRegister({
    labId,
  });
  const [key, setKey] = useState(0);

  const { state, dispatch, reset } = useForm<Values>({
    jobName: "",
    expectedTime: "",
    minPerformance: "" as unknown as number,
    metaData: "",
    gpuServerId: "" as unknown as number,
  });

  const handleSubmit = ({ jobName, expectedTime, gpuServerId, metaData }: Values) => {
    makeRequest({ name: jobName, expectedTime, gpuServerId, metaData });
  };

  const form = getFormProps({ state, dispatch, handleSubmit });

  const jobNameInputProps = getInputProps({
    state,
    dispatch,
    name: "jobName",
    label: "Job 이름",
    validator: jobNameValidator,
  });

  const expectedTimeInputProps = getInputProps({
    state,
    dispatch,
    name: "expectedTime",
    label: "Job 예상 실행 시간(hour)",
    validator: expectedTimeValidator,
  });

  const minPerformanceInputProps = getInputProps({
    state,
    dispatch,
    name: "minPerformance",
    label: "최소 필요 연산량(TFLOPS)",
    validator: minPerformanceValidator,
  });

  const metaDataInputProps = getInputProps({
    state,
    dispatch,
    name: "metaData",
    label: "Docker Hub Image",
    validator: dockerHubImageValidator,
  });

  const handleConfirm = () => {
    reset();
    setKey((k) => k + 1);
    done();
  };

  return (
    <>
      <Dialog open={isSucceed} onClose={done} onConfirm={handleConfirm}>
        <Text size="md" weight="bold">
          Job 등록에 성공하였습니다.
        </Text>
      </Dialog>

      <Dialog open={isFailed} onClose={done} onConfirm={done}>
        <Text size="md" weight="bold">
          Job 등록에 실패하였습니다.
        </Text>
      </Dialog>

      {isLoading && (
        <Dimmer>
          <Loading size="lg" />
        </Dimmer>
      )}

      <StyledForm key={key} {...rest} {...form}>
        <Input size="sm" {...jobNameInputProps} />
        <Input size="sm" {...expectedTimeInputProps} />
        <Input size="sm" {...minPerformanceInputProps} />
        <Input size="sm" {...metaDataInputProps} placeholder="계정명/저장소명:버전" />
        <JobRegisterRadioGroup
          labId={labId}
          state={state}
          dispatch={dispatch}
          name="gpuServerId"
          label="GPU 서버 선택"
          minPerformance={Number(minPerformanceInputProps.value)}
        />
        <Button className="submit" color="secondary" disabled={!isIdle}>
          제출
        </Button>
      </StyledForm>
    </>
  );
};

export default JobRegisterForm;
