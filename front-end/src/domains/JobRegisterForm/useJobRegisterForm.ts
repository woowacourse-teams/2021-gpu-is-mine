import { jobNameValidator, expectedTimeValidator, minPerformanceValidator } from "./validator";
import useForm, { getInputProps, getFormProps } from "../../hooks/useFormNew/useFormNew";
import { APIFunctions, JobRegisterRequest } from "../../types";

type Values = {
  jobName: string;
  expectedTime: number;
  minPerformance: number;
  metaData: string;
  gpuServerId: number;
};

const useJobRegisterForm = (onSubmit: APIFunctions<void, JobRegisterRequest>["makeRequest"]) => {
  const { state, dispatch, reset } = useForm<Values>({
    jobName: "",
    expectedTime: "" as unknown as number,
    minPerformance: "" as unknown as number,
    metaData: "",
    gpuServerId: "" as unknown as number,
  });

  const handleSubmit = ({ jobName, expectedTime, gpuServerId, metaData }: Values) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onSubmit({ name: jobName, expectedTime, gpuServerId, metaData });
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
    label: "Docker Hub Url",
  });

  const { onMount, ...gpuServerSelectProps } = getInputProps({
    state,
    dispatch,
    name: "gpuServerId",
    label: "GPU 서버 선택",
  });

  return {
    form,
    jobNameInputProps,
    expectedTimeInputProps,
    minPerformanceInputProps,
    metaDataInputProps,
    gpuServerSelectProps,
    reset,
  };
};

export default useJobRegisterForm;
