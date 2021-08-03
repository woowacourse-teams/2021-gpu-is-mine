import {
  ChangeEventHandler,
  FocusEventHandler,
  ComponentProps,
  useEffect,
  // FocusEvent,
} from "react";
import { useGetGpuServerAll } from "../../hooks";
import { RadioGroup, Loading, Text, Radio } from "../../components";
import GpuServerSelectItem from "../GpuServerSelectItem/GpuServerSelectItem";
import { StyledRadioGroup } from "./JobRegisterRadioGroup.styled";
import { GpuServerViewResponse } from "../../types";

interface JobRegisterRadioGroupProps extends Omit<ComponentProps<typeof RadioGroup>, "children"> {
  minPerformance: number;
  value: string | number;
  name: string;
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
}

const sortByIsOn = (a: GpuServerViewResponse, b: GpuServerViewResponse): number => {
  if (a.isOn && !b.isOn) return -1;
  if (!a.isOn && b.isOn) return 1;

  return 0;
};

const JobRegisterRadioGroup = ({
  minPerformance,
  value: selectedValue,
  name,
  onChange,
  onBlur,
  ...rest
}: JobRegisterRadioGroupProps) => {
  const { data, status, makeRequest } = useGetGpuServerAll({ labId: 1 });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event);
    // onBlur(event as FocusEvent<HTMLInputElement>);
  };

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
            .sort(sortByIsOn)
            .map(({ id, serverName, isOn, gpuBoard: { performance }, jobs }) => (
              <li key={id}>
                <Radio
                  value={id}
                  checked={selectedValue === String(id)}
                  name={name}
                  onChange={handleChange}
                  disabled={!isOn}
                >
                  <GpuServerSelectItem
                    serverName={serverName}
                    isOn={isOn}
                    performance={performance}
                    jobs={jobs}
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
