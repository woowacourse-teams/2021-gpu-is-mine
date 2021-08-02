import { FormHTMLAttributes, useState } from "react";
import { usePostJobRegister } from "../../hooks";
import useJobRegisterForm from "./useJobRegisterForm";
import { Alert, Button, Dimmer, Input, Loading, Text } from "../../components";
import { StyledForm } from "./JobRegisterForm.styled";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";

interface JobRegisterFormProps extends FormHTMLAttributes<HTMLFormElement> {
  labId: number;
}

const JobRegisterForm = ({ labId, ...rest }: JobRegisterFormProps) => {
  const { status, makeRequest, done } = usePostJobRegister({ labId });
  const [key, setKey] = useState(0);

  const {
    form,
    reset,
    jobNameInputProps,
    expectedTimeInputProps,
    minPerformanceInputProps,
    metaDataInputProps,
    gpuServerSelectProps,
  } = useJobRegisterForm(makeRequest);

  const handleConfirm = () => {
    reset();
    setKey((k) => k + 1);
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

      <StyledForm key={key} {...rest} {...form}>
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
