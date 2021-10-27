/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, ChangeEventHandler, FormHTMLAttributes } from "react";
import {
  dockerHubImageValidator,
  expectedTimeValidator,
  jobNameValidator,
  minPerformanceValidator,
} from "./validator";
import { getFormProps, getInputProps, useForm, useBoolean } from "../../hooks";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerJob, selectJobActionState } from "../../features/job/jobSlice";
import { RootState } from "../../app/store";

interface JobRegisterFormProps extends FormHTMLAttributes<HTMLFormElement> {
  labId: number;
}

const JobRegisterForm = ({ labId, ...rest }: JobRegisterFormProps) => {
  const appDispatch = useAppDispatch();

  const [key, setKey] = useState(0);

  const [isDialogOpen, openDialog, closeDialog] = useBoolean(false);

  const { isSucceed, isFailed, isLoading, error } = useAppSelector((state: RootState) =>
    selectJobActionState(state, registerJob)
  );

  const handleSubmit = ({ jobName, expectedTime, gpuServerId, dockerHubImage }: Values) => {
    appDispatch(
      registerJob({ name: jobName, expectedTime, gpuServerId, metaData: dockerHubImage })
    );

    openDialog();
  };

  const { state, dispatch, reset } = useForm<Values>({
    jobName: "",
    expectedTime: "",
    minPerformance: "" as unknown as number,
    dockerHubImage: "",
    gpuServerId: "" as unknown as number,
  });

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

  const dockerHubImageInputProps = getInputProps({
    state,
    dispatch,
    name: "dockerHubImage",
    label: "Docker Hub Image",
    validator: dockerHubImageValidator,
  });

  const handleConfirm = () => {
    reset();
    setKey((k) => k + 1);
    closeDialog();
  };

  const [isToolTipVisible, openToolTip, closeToolTip] = useBoolean(false);

  const handleSampleImageButtonClick = () => {
    dispatch(
      updateValue({
        name: dockerHubImageInputProps.name,
        value: "aprn7950/mnist_test_auto",
        validationMessage: "",
      })
    );
  };

  const handleDockerHubImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const matched = /^\s*docker\s+pull\s+(.*)$/.exec(event.target.value);

    if (!matched) {
      dockerHubImageInputProps.onChange(event);
      return;
    }

    const [, dockerHubImage] = matched;

    dispatch(
      updateValue({
        name: dockerHubImageInputProps.name,
        value: dockerHubImage,
        validationMessage: dockerHubImageValidator(dockerHubImage) ?? "",
      })
    );
  };

  return (
    <>
      {isDialogOpen && (
        <>
          <Dialog open={isSucceed} onClose={closeDialog} onConfirm={handleConfirm}>
            <Text size="md" weight="bold">
              Job 등록에 성공하였습니다.
            </Text>
          </Dialog>

          <Dialog open={isFailed} onClose={closeDialog} onConfirm={closeDialog}>
            <Text size="md" weight="bold">
              Job 등록에 실패하였습니다.
              {error?.message}
            </Text>
          </Dialog>
        </>
      )}

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
            {...dockerHubImageInputProps}
            onChange={handleDockerHubImageChange}
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
                샘플 이미지
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
        <Button className="submit" color="secondary" disabled={isLoading}>
          제출
        </Button>
      </StyledForm>
    </>
  );
};

export default JobRegisterForm;
