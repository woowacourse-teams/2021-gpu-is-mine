import { gpuServersResponses } from "../../__fixtures__";
import { sortByIsOn, sortByPerformanceDesc } from "./JobRegisterRadioGroup";

describe("sort", () => {
  test("sortByPerformanceDesc", () => {
    gpuServersResponses.gpuServers
      .slice()
      .sort(sortByPerformanceDesc)
      .map(({ gpuBoard: { performance } }) => performance)
      .reduce((prev, curr) => {
        expect(prev).toBeGreaterThan(curr);

        return curr;
      }, Infinity);
  });

  test("sortByIsOn: On-Server comes earlier than Off-Server", () => {
    const sorted = gpuServersResponses.gpuServers
      .slice()
      .sort(sortByIsOn)
      .map(({ isOn }) => isOn);

    const lastTrue = sorted.lastIndexOf(true);
    const firstFalse = sorted.indexOf(false);

    if (lastTrue === -1 || firstFalse === -1) {
      return;
    }

    expect(lastTrue).toBeLessThan(firstFalse);
  });
});
