/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, ChangeEventHandler, FormHTMLAttributes } from "react";
import {
  dockerHubImageValidator,
  expectedTimeValidator,
  jobNameValidator,
  minPerformanceValidator,
} from "./validator";
import { getFormProps, getInputProps, useForm, usePostJobRegister, useBoolean } from "../../hooks";
import { Dialog, Button, Dimmer, Input, Loading, Text } from "../../components";
import {
  DockerHubImageSection,
  SampleImageButton,
  StyledForm,
  ToolTipBox,
  ToolTipContainer,
} from "./JobRegisterForm.styled";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";
import { Values } from "./JobRegisterForm.type";
import { updateValue } from "../../hooks/useForm/useForm";

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

  const [isToolTipVisible, openToolTip, closeToolTip] = useBoolean(false);

  const handleSampleImageButtonClick = () => {
    dispatch(
      updateValue({
        name: metaDataInputProps.name,
        value: "aprn7950/mnist_test_auto",
        validationMessage: "",
      })
    );
  };

  const handleMetaDataInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const matched = /^\s*docker\s+pull\s+(.*)$/.exec(event.target.value);

    if (!matched) {
      metaDataInputProps.onChange(event);
      return;
    }

    const [, dockerHubImage] = matched;

    dispatch(
      updateValue({
        name: metaDataInputProps.name,
        value: dockerHubImage,
        validationMessage: dockerHubImageValidator(dockerHubImage) ?? "",
      })
    );
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
        <DockerHubImageSection>
          <Input
            size="sm"
            list="example-dockerhub-image"
            placeholder="계정명/저장소명:버전"
            {...metaDataInputProps}
            onChange={handleMetaDataInputChange}
          />
          <datalist id="example-dockerhub-image">
            <option value="aprn7950/mnist_test_auto" />
          </datalist>

          <ToolTipContainer onMouseLeave={closeToolTip}>
            <SampleImageButton
              type="button"
              onClick={handleSampleImageButtonClick}
              onMouseOver={openToolTip}
              onFocus={openToolTip}
              onBlur={closeToolTip}
              onKeyDown={closeToolTip}
            >
              <Text as="p" weight="medium" size="sm">
                샘플 이미지 입력하기
              </Text>
            </SampleImageButton>
            {isToolTipVisible && (
              <ToolTipBox>
                <Text as="span" weight="medium" size="sm">
                  버튼을 클릭하여 미리 준비해둔 샘플 이미지를 등록해보세요 :-)
                </Text>
              </ToolTipBox>
            )}
          </ToolTipContainer>
        </DockerHubImageSection>
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
