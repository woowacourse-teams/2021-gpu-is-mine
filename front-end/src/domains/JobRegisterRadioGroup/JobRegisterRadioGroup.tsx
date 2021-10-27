import { ComponentProps, useEffect, Dispatch } from "react";
import { getRadioProps } from "../../hooks";
import { FormAction, FormState, updateValue } from "../../hooks/useForm/useForm";
import { RadioGroup, Loading, Text, Radio } from "../../components";
import GpuServerSelectItem from "../GpuServerSelectItem/GpuServerSelectItem";
import { StyledRadioGroup } from "./JobRegisterRadioGroup.styled";
import { Values } from "../JobRegisterForm/JobRegisterForm.type";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  fetchAllGpuServer,
  GpuServer,
  selectAllGpuServer,
  selectGpuServerStatus,
} from "../../features/gpuServer/gpuServerSlice";

interface JobRegisterRadioGroupProps extends Omit<ComponentProps<typeof RadioGroup>, "children"> {
  minPerformance: number;
  labId: number;
  state: FormState<Values>;
  dispatch: Dispatch<FormAction<Values>>;
  name: keyof Values;
}

export const sortByIsOn = (a: GpuServer, b: GpuServer): number => {
  if (a.isOn && !b.isOn) return -1;
  if (!a.isOn && b.isOn) return 1;

  return 0;
};
export const sortByPerformanceDesc = (a: GpuServer, b: GpuServer): number =>
  b.performance - a.performance;

const JobRegisterRadioGroup = ({
  minPerformance,
  labId,
  state,
  dispatch,
  name,
  ...rest
}: JobRegisterRadioGroupProps) => {
  const appDispatch = useAppDispatch();

  const { isLoading, isSucceed, isFailed, error } = useAppSelector((appState: RootState) =>
    selectGpuServerStatus(appState, fetchAllGpuServer)
  );

  const gpuServers = useAppSelector((appState: RootState) => selectAllGpuServer(appState));

  useEffect(() => {
    appDispatch(fetchAllGpuServer());
  }, [appDispatch]);

  const validationMessage = state.areValidationMessagesVisible[name]
    ? state.validationMessages[name]
    : "";

  useEffect(() => {
    dispatch(updateValue({ name, value: "", validationMessage: "GPU 서버를 선택해주세요" }));
  }, [dispatch, name]);

  return (
    <StyledRadioGroup validationMessage={validationMessage} {...rest}>
      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}

      {isFailed && (
        <Text weight="medium" size="sm" className="validation-message">
          {error?.name}
          :서버 정보를 불러오는데 실패하였습니다.
        </Text>
      )}

      {isSucceed && (
        <ol className="job-register-radio-group__list">
          {gpuServers
            .slice()
            .sort(sortByPerformanceDesc)
            .sort(sortByIsOn)
            .map(({ id, serverName, isOn, performance, waitingJobCount, totalExpectedTime }) => (
              <li key={id}>
                <Radio
                  {...getRadioProps({
                    state,
                    dispatch,
                    name,
                    label: serverName,
                    value: String(id),
                  })}
                  disabled={!isOn || performance < minPerformance}
                >
                  <GpuServerSelectItem
                    serverName={serverName}
                    isOn={isOn}
                    performance={performance}
                    waitingJobCount={waitingJobCount}
                    totalExpectedTime={totalExpectedTime}
                  />
                </Radio>
              </li>
            ))}
        </ol>
      )}
    </StyledRadioGroup>
  );
};

export default JobRegisterRadioGroup;
