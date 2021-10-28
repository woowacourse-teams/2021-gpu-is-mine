/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, ChangeEventHandler, FormHTMLAttributes, FocusEventHandler } from "react";
import {
  dockerHubImageValidator,
  expectedTimeValidator,
  jobNameValidator,
  minPerformanceValidator,
} from "./validator";
import { RootState } from "../../../app/store";
import {
  registerJob,
  RequiredSerializedError,
  selectJobActionState,
} from "../../../features/job/jobSlice";
import { updateValue } from "../../../hooks/useForm/useForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getFormProps, getInputProps, useForm, useBoolean } from "../../../hooks";
import { Dimmer, Input, Loading, Text, useToast } from "../../../components";
import InfoIcon from "../../../components/Toast/ToastTypeIcon/info.svg";
import {
  DockerHubImageSection,
  SampleImageButton,
  StyledForm,
  ToolTipBox,
  ToolTipContainer,
  StyledButton,
} from "./JobRegisterForm.styled";
import JobRegisterRadioGroup from "../JobRegisterRadioGroup/JobRegisterRadioGroup";
import type { Values } from "./JobRegisterForm.type";

interface JobRegisterFormProps extends FormHTMLAttributes<HTMLFormElement> {
  labId: number;
}

const JobRegisterForm = ({ labId, ...rest }: JobRegisterFormProps) => {
  const appDispatch = useAppDispatch();

  const [key, setKey] = useState(0);

  const showToast = useToast();

  const { isLoading } = useAppSelector((state: RootState) =>
    selectJobActionState(state, registerJob)
  );

  const { state, dispatch, reset } = useForm<Values>({
    jobName: "",
    expectedTime: "",
    minPerformance: "" as unknown as number,
    dockerHubImage: "",
    gpuServerId: "" as unknown as number,
  });

  const handleSubmit = async ({ jobName, expectedTime, gpuServerId, dockerHubImage }: Values) => {
    try {
      await appDispatch(
        registerJob({
          name: jobName,
          expectedTime,
          gpuServerId,
          metaData: dockerHubImage,
        })
      ).unwrap();

      reset();
      setKey((k) => k + 1);

      showToast({
        type: "success",
        title: "Job 등록에 성공하였습니다",
        message: `${jobName}이(가) 성공적으로 등록되었습니다`,
      });
    } catch (err) {
      const error = err as RequiredSerializedError;

      showToast({
        type: "error",
        title: error.name,
        message: error.message,
      });
    }
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

  const dockerHubImageInputProps = getInputProps({
    state,
    dispatch,
    name: "dockerHubImage",
    label: "Docker Hub Image",
    validator: dockerHubImageValidator,
  });

  const [isToolTipVisible, openToolTip, closeToolTip] = useBoolean(false);

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

  const handleDockerHubImageBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    closeToolTip();
    dockerHubImageInputProps.onBlur(event);
  };

  return (
    <>
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
            autoComplete="off"
            {...dockerHubImageInputProps}
            list="example-dockerhub-image"
            placeholder="계정명/저장소명:버전"
            onChange={handleDockerHubImageChange}
            onFocus={openToolTip}
            onBlur={handleDockerHubImageBlur}
          />
          <datalist id="example-dockerhub-image">
            <option value="aprn7950/mnist_epoch_30_auto">빠른 학습</option>
            <option value="aprn7950/mnist_epoch_50_auto">중간 학습</option>
            <option value="aprn7950/mnist_epoch_100_auto">느린 학습</option>
          </datalist>
          <ToolTipContainer onMouseLeave={closeToolTip}>
            <SampleImageButton
              type="button"
              onMouseOver={openToolTip}
              onFocus={openToolTip}
              onBlur={closeToolTip}
              onKeyDown={closeToolTip}
            >
              <InfoIcon width="36px" height="36px" fill="#de7326" />
            </SampleImageButton>
            {isToolTipVisible && (
              <ToolTipBox>
                <Text as="span" weight="medium" size="sm">
                  Input을 클릭하면 샘플 이미지를 선택할 수 있어요 :-)
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
        <StyledButton color="secondary" disabled={isLoading}>
          제출
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default JobRegisterForm;
