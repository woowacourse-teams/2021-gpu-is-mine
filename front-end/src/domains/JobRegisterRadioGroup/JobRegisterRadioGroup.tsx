import { ComponentProps, useEffect, Dispatch } from "react";
import { useGetGpuServerAll, getRadioProps } from "../../hooks";
import { FormAction, FormState } from "../../hooks/useForm/useForm";
import { RadioGroup, Loading, Text, Radio } from "../../components";
import GpuServerSelectItem from "../GpuServerSelectItem/GpuServerSelectItem";
import { StyledRadioGroup } from "./JobRegisterRadioGroup.styled";
import { GpuServerViewResponse } from "../../types";
import { Values } from "../JobRegisterForm/JobRegisterForm.type";

interface JobRegisterRadioGroupProps extends Omit<ComponentProps<typeof RadioGroup>, "children"> {
  minPerformance: number;
  labId: number;
  state: FormState<Values>;
  dispatch: Dispatch<FormAction<Values>>;
  name: keyof Values;
}

export const sortByIsOn = (a: GpuServerViewResponse, b: GpuServerViewResponse): number => {
  if (a.isOn && !b.isOn) return -1;
  if (!a.isOn && b.isOn) return 1;

  return 0;
};
export const sortByPerformanceDesc = (a: GpuServerViewResponse, b: GpuServerViewResponse): number =>
  b.gpuBoard.performance - a.gpuBoard.performance;

const JobRegisterRadioGroup = ({
  minPerformance,
  labId,
  state,
  dispatch,
  name,
  ...rest
}: JobRegisterRadioGroupProps) => {
  const { data, status, makeRequest, done } = useGetGpuServerAll({ labId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return (
    <StyledRadioGroup {...rest}>
      {status === "loading" && (
        <div className="loading-container">
          <Loading />
        </div>
      )}

      {status === "failed" && (
        <Text weight="medium" size="sm" className="validation-message">
          서버 정보를 불러오는데 실패하였습니다.
        </Text>
      )}

      {status === "succeed" && (
        <ol className="job-register-radio-group__list">
          {data?.gpuServers
            .slice()
            .sort(sortByPerformanceDesc)
            .sort(sortByIsOn)
            .map(
              ({
                id,
                serverName,
                isOn,
                gpuBoard: { performance },
                runningJobs,
                waitingJobCount,
                totalExpectedTime,
              }) => (
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
                      runningJobs={runningJobs}
                      waitingJobCount={waitingJobCount}
                      totalExpectedTime={totalExpectedTime}
                    />
                  </Radio>
                </li>
              )
            )}
        </ol>
      )}
    </StyledRadioGroup>
  );
};

export default JobRegisterRadioGroup;
